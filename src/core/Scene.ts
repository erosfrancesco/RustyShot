import { Engine, Scene } from '@babylonjs/core';
import { Game } from './Game';

export type SceneState = 'loading' | 'ready' | 'active' | 'paused' | 'disposed';
export type SceneType = 'main' | 'asset-manager' | 'test';

/** Abstract base class for logical game scenes. */
export abstract class BaseScene {
  protected readonly game: Game;
  protected readonly engine: Engine;
  protected readonly scene: Scene;
  protected state: SceneState = 'loading';

  constructor(game: Game) {
    this.game = game;
    this.engine = game.getEngine();
    this.scene = game.getScene();
  }

  /** Called once when the scene is first created. */
  abstract setup(): Promise<void> | void;

  /** Called every frame while the scene is active. */
  abstract update(deltaTime: number): void;

  /** Called when the scene becomes active. */
  onEnter(): void {
    this.state = 'active';
  }

  /** Called when the scene is deactivated. */
  onExit(): void {
    this.state = 'paused';
  }

  /** Cleanup resources. */
  dispose(): void {
    this.state = 'disposed';
  }

  getState(): SceneState {
    return this.state;
  }

  isActive(): boolean {
    return this.state === 'active';
  }

  isLoading(): boolean {
    return this.state === 'loading';
  }
}