import { BaseScene } from '../core/Scene';
import { Game } from '../core/Game';
import { MeshBuilder, ArcRotateCamera, Vector3, HemisphericLight, Color4 } from '@babylonjs/core';

/** Isolated test scene for debugging nook presets. */
export class TestScene extends BaseScene {
  constructor(game: Game) {
    super(game);
  }

  async setup(): Promise<void> {
    const camera = new ArcRotateCamera('arcRotateCamera', Math.PI / 2, Math.PI / 3, 3.5, new Vector3(0, 0.6, 0), this.scene);
    camera.setTarget(Vector3.Zero());
    const canvas = this.engine.getRenderingCanvas();
    if (canvas) {
      camera.attachControl(canvas, true);
    }

    new HemisphericLight('ambientLight', new Vector3(0, 1, 0), this.scene).intensity = 0.6;

    MeshBuilder.CreateGround('ground', { width: 4, height: 4 }, this.scene);

    this.state = 'ready';
  }

  update(_deltaTime: number): void {
    if (this.state !== 'active') return;
    // Test per-frame logic
  }

  onEnter(): void {
    super.onEnter();
    this.scene.clearColor = new Color4(0.03, 0.03, 0.04, 1.0);
  }
}