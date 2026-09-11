import {
  Engine,
  Scene,
  Vector3,
  HemisphericLight,
  FreeCamera,
  MeshBuilder,
} from '@babylonjs/core';
import { GameState } from './GameState';
import { GameEvents, GameEventMap } from './Events';
import { EventEmitter } from '../utils/EventEmitter';
import { AssetManager } from '../assets/AssetManager';
import { AssetRegistry } from '../assets/AssetRegistry';
import { CombatSystem } from '../combat/CombatSystem';
import { DamageSystem } from '../combat/DamageSystem';
import { WeaponSystem } from '../combat/WeaponSystem';
import { AnimationController } from '../animation/AnimationController';
import { PlayerRPG } from '../rpg/PlayerRPG';

export class Game {
  private readonly engine: Engine;
  private readonly scene: Scene;
  private readonly eventBus: EventEmitter<GameEventMap>;
  private state: GameState = GameState.Loading;
  private running = false;
  private lastTime = 0;
  private readonly assetManager: AssetManager;

  private readonly combatSystem: CombatSystem;
  private readonly damageSystem: DamageSystem;
  private readonly weaponSystem: WeaponSystem;
  private readonly animationController: AnimationController;
  private readonly playerRPG: PlayerRPG;

  constructor(canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
    this.scene = new Scene(this.engine);
    this.eventBus = new EventEmitter<GameEventMap>();
    this.assetManager = new AssetManager(this.scene);

    this.combatSystem = new CombatSystem(this);
    this.damageSystem = new DamageSystem(this);
    this.weaponSystem = new WeaponSystem(this);
    this.animationController = new AnimationController(this.scene);
    this.playerRPG = new PlayerRPG(this);

    this.setupScene();
    this.setupResize(canvas);
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

  getCombatSystem(): CombatSystem {
    return this.combatSystem;
  }

  getDamageSystem(): DamageSystem {
    return this.damageSystem;
  }

  getWeaponSystem(): WeaponSystem {
    return this.weaponSystem;
  }

  getAnimationController(): AnimationController {
    return this.animationController;
  }

  getPlayerRPG(): PlayerRPG {
    return this.playerRPG;
  }

  start(): void {
    if (this.running) {return;}
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
    this.scene.dispose();
    this.engine.dispose();
    this.eventBus.removeAll();
  }

  private setupScene(): void {
    const camera = new FreeCamera('playerCamera', new Vector3(0, 5, -10), this.scene);
    camera.setTarget(Vector3.Zero());
    const canvas = this.engine.getRenderingCanvas();
    if (canvas) {
      camera.attachControl(canvas, true);
    }
    camera.minZ = 0.1;

    new HemisphericLight('ambientLight', new Vector3(0, 1, 0), this.scene);

    MeshBuilder.CreateGround('ground', { width: 20, height: 20 }, this.scene);
    MeshBuilder.CreateBox('playerMarker', { size: 0.5 }, this.scene);

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
    });
  }

  private setupResize(canvas: HTMLCanvasElement): void {
    window.addEventListener('resize', () => {
      this.engine.resize();
    });
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.id = 'gameCanvas';
    document.getElementById('app')?.appendChild(canvas);
  }

  private setState(next: GameState): void {
    const prev = this.state;
    this.state = next;
    this.eventBus.emit(GameEvents.StateChange, { from: prev, to: next });
  }

  private update(deltaTime: number): void {
    if (this.state !== GameState.Playing) {return;}
    this.combatSystem.update(deltaTime);
    this.damageSystem.update(deltaTime);
    this.weaponSystem.update(deltaTime);
  }
}
