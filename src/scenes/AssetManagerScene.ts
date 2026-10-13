import { BaseScene } from '../core/Scene';
import { Game } from '../core/Game';
import { MeshBuilder, FreeCamera, Vector3, HemisphericLight, DirectionalLight, Color4 } from '@babylonjs/core';

/** Asset manager editor scene for creating and previewing nook presets. */
export class AssetManagerScene extends BaseScene {

  constructor(game: Game) {
    super(game);
  }

  async setup(): Promise<void> {
    const camera = new FreeCamera('editorCamera', new Vector3(0, 8, -12), this.scene);
    camera.setTarget(Vector3.Zero());
    const canvas = this.engine.getRenderingCanvas();
    if (canvas) {
      camera.attachControl(canvas, true);
    }
    camera.minZ = 0.1;

    new HemisphericLight('ambientLight', new Vector3(0, 1, 0), this.scene).intensity = 0.6;

    new DirectionalLight('directionalLight', new Vector3(-1, -2, -1), this.scene).intensity = 0.8;

    MeshBuilder.CreateGround('ground', { width: 30, height: 30, subdivisions: 2 }, this.scene);

    MeshBuilder.CreateCylinder('previewPedestal', { height: 0.2, diameterTop: 1.2, diameterBottom: 1.4 }, this.scene);

    MeshBuilder.CreateLines('gridHelper', { points: this.generateGridPoints(30, 1) }, this.scene);

    this.state = 'ready';
  }

  private generateGridPoints(size: number, step: number): Vector3[] {
    const points: Vector3[] = [];
    for (let x = -size; x <= size; x += step) {
      points.push(new Vector3(x, 0, -size), new Vector3(x, 0, size));
    }
    for (let z = -size; z <= size; z += step) {
      points.push(new Vector3(-size, 0, z), new Vector3(size, 0, z));
    }
    return points;
  }

  update(_deltaTime: number): void {
    if (this.state !== 'active') return;
    // Editor per-frame logic
  }

  onEnter(): void {
    super.onEnter();
    this.scene.clearColor = new Color4(0.1, 0.1, 0.1, 1.0);
  }
}