import { Engine, Scene } from '@babylonjs/core';
import { GameState } from './GameState';
import { GameEvents, GameEventMap } from './Events';
import { EventEmitter } from '../utils/EventEmitter';
import { AssetManager } from '../assets/AssetManager';
import { AssetRegistry } from '../assets/AssetRegistry';
import { BaseScene } from './Scene';

export type SceneType = 'main' | 'asset-manager';

/** Scene class constructors for dynamic HMR reloading. */
interface SceneConstructors {
  MainScene: new (game: Game) => BaseScene;
  AssetManagerScene: new (game: Game) => BaseScene;
}

/** Central game orchestrator: engine, scenes, render loop, and subsystems. */
export class Game {
  private readonly engine: Engine;
  private scene: Scene;
  private readonly eventBus: EventEmitter<GameEventMap>;
  private state: GameState = GameState.Loading;
  private running = false;
  private lastTime = 0;
  private assetManager: AssetManager;

  private readonly scenes = new Map<SceneType, BaseScene>();
  private activeScene: BaseScene | null = null;
  private pendingScene: SceneType | null = null;

  /** Scene constructors - updated on HMR. */
  private sceneConstructors!: SceneConstructors;

  private initPromise: Promise<void>;

  constructor(canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
    this.scene = new Scene(this.engine);
    this.eventBus = new EventEmitter<GameEventMap>();
    this.assetManager = new AssetManager(this.scene);

    // Load initial scene constructors
    this.initPromise = this.loadSceneConstructors().then(() => {
      this.createScenes();
      this.setupResize(canvas);
    });
  }

  /** Dynamically import scene classes for HMR support. */
  private async loadSceneConstructors(): Promise<void> {
    const [MainSceneMod, AssetManagerSceneMod] = await Promise.all([
      import('../scenes/main/MainScene'),
      import('../scenes/asset-manager/AssetManagerScene'),
    ]);
    this.sceneConstructors = {
      MainScene: MainSceneMod.MainScene,
      AssetManagerScene: AssetManagerSceneMod.AssetManagerScene,
    };
  }

  private createScenes(): void {
    if (!this.sceneConstructors) return;
    this.scenes.set('main', new this.sceneConstructors.MainScene(this));
    this.scenes.set('asset-manager', new this.sceneConstructors.AssetManagerScene(this));
  }

  /** Update scene constructors from new module exports (called on HMR). */
  async updateSceneConstructors(): Promise<void> {
    await this.loadSceneConstructors();
    this.createScenes();
  }

  getEngine(): Engine {
    return this.engine;
  }

  getScene(): Scene {
    return this.scene;
  }

  getEventBus(): EventEmitter<GameEventMap> {
    return this.eventBus;
  }

  getAssetManager(): AssetManager {
    return this.assetManager;
  }

  getState(): GameState {
    return this.state;
  }

  getActiveScene(): BaseScene | null {
    return this.activeScene;
  }

  getSceneInstance(type: SceneType): BaseScene | undefined {
    return this.scenes.get(type);
  }

  async initialize(): Promise<void> {
    await this.initPromise;
    await Promise.all([
      this.scenes.get('main')?.setup(),
      this.scenes.get('asset-manager')?.setup(),
    ]);
    await this.loadAssets();
  }

  /** Hot-reload scenes while preserving engine/canvas. */
  async hotReload(): Promise<void> {
    const wasRunning = this.running;
    if (wasRunning) this.stop();

    this.activeScene?.dispose();
    this.scene.dispose();

    // Recreate scene with same engine
    this.scene = new Scene(this.engine);

    // Recreate asset manager with new scene
    this.assetManager = new AssetManager(this.scene);

    // Recreate scenes (they will capture the new scene via game.getScene())
    this.scenes.clear();
    this.createScenes();
    this.activeScene = null;
    this.pendingScene = null;

    await this.initialize();

    // Sync drawing buffer after reload
    this.engine.resize();
    // Focus canvas for keyboard input
    this.engine.getRenderingCanvas()?.focus();

    if (wasRunning) this.start();
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.engine.runRenderLoop(() => {
      const now = performance.now();
      const deltaTime = Math.min((now - this.lastTime) / 1000, 0.1);
      this.lastTime = now;
      this.update(deltaTime);
      this.scene.render();
    });
    this.setState(GameState.Playing);
    this.switchScene('main');
  }

  stop(): void {
    this.running = false;
    this.engine.stopRenderLoop();
    this.setState(GameState.Paused);
  }

  async loadAssets(): Promise<void> {
    this.setState(GameState.Loading);
    await this.assetManager.loadAll(AssetRegistry as unknown as Record<string, string>);
    this.setState(GameState.Playing);
  }

  dispose(): void {
    this.stop();
    this.activeScene?.dispose();
    this.scene.dispose();
    this.engine.dispose();
    this.eventBus.removeAll();
  }

  switchScene(type: SceneType): void {
    const nextScene = this.scenes.get(type);
    if (!nextScene) {
      console.warn(`Scene ${type} not found`);
      return;
    }
    if (this.activeScene === nextScene) return;

    if (this.activeScene) {
      this.activeScene.onExit();
    }
    this.activeScene = nextScene;
    if (nextScene.isLoading()) {
      this.pendingScene = type;
    } else {
      this.activeScene.onEnter();
      this.pendingScene = null;
    }
    this.eventBus.emit(GameEvents.StateChange, { from: this.activeScene.getState(), to: 'active' });
  }

  private setupResize(canvas: HTMLCanvasElement): void {
    window.addEventListener('resize', () => {
      this.engine.resize();
    });
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.id = 'gameCanvas';
    document.getElementById('app')?.appendChild(canvas);

    // Sync drawing buffer to CSS size
    this.engine.resize();
    // Focus canvas for keyboard input
    canvas.focus();

    window.addEventListener('keydown', (ev: KeyboardEvent) => {
      if (ev.key === 'i') {
        if (this.scene.debugLayer.isVisible()) {
          this.scene.debugLayer.hide();
        } else {
          this.scene.debugLayer.show();
        }
      }
      if (ev.key === 'p') {
        if (this.state === GameState.Playing) {
          this.stop();
        } else if (this.state === GameState.Paused) {
          this.start();
        }
      }
      if (ev.key === '1') this.switchScene('main');
      if (ev.key === '2') this.switchScene('asset-manager');
    });
  }

  private setState(next: GameState): void {
    const prev = this.state;
    this.state = next;
    this.eventBus.emit(GameEvents.StateChange, { from: prev, to: next });
  }

  private update(deltaTime: number): void {
    if (this.state !== GameState.Playing) return;

    if (this.pendingScene && this.activeScene?.isLoading() === false) {
      this.activeScene.onEnter();
      this.pendingScene = null;
    }

    this.activeScene?.update(deltaTime);
  }
}