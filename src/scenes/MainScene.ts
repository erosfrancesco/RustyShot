import { BaseScene } from '../core/Scene';
import { Game } from '../core/Game';
import { MeshBuilder, FreeCamera, Vector3, HemisphericLight, PointLight, Color3, Color4 } from '@babylonjs/core';
import { GameEvents } from '../core/Events';

/** Main nook viewer scene. */
export class MainScene extends BaseScene {
  private nookRoot?: any;

  constructor(game: Game) {
    super(game);
  }

  async setup(): Promise<void> {
    const camera = new FreeCamera('mainCamera', new Vector3(0, 5, -10), this.scene);
    camera.setTarget(Vector3.Zero());
    const canvas = this.engine.getRenderingCanvas();
    if (canvas) {
      camera.attachControl(canvas, true);
    }
    camera.minZ = 0.1;

    new HemisphericLight('ambientLight', new Vector3(0, 1, 0), this.scene);

    const pointLight = new PointLight('warmPointLight', new Vector3(0, 2.2, 0), this.scene);
    pointLight.diffuse = new Color3(1, 0.9, 0.7);
    pointLight.intensity = 0.6;

    MeshBuilder.CreateBox('roomBase', { width: 4, height: 2.4, depth: 1.2 }, this.scene);
    MeshBuilder.CreateGround('floor', { width: 3, height: 1 }, this.scene);

    this.game.getEventBus().on(GameEvents.StateChange, () => {
      // React to game state changes if needed
    });

    this.state = 'ready';
  }

  update(_deltaTime: number): void {
    if (this.state !== 'active') return;
    // Per-frame logic for main scene
  }

  onEnter(): void {
    super.onEnter();
    this.scene.clearColor = new Color4(0.02, 0.02, 0.03, 1.0);
  }

  onExit(): void {
    super.onExit();
    if (this.nookRoot) {
      this.nookRoot.dispose();
      this.nookRoot = undefined;
    }
  }
}