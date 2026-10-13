import { BaseScene } from '../core/Scene';
import { Game } from '../core/Game';
import { MeshBuilder, FreeCamera, Vector3, HemisphericLight, PointLight, Color3, Color4, TransformNode, Scene } from '@babylonjs/core';
import { GameEvents } from '../core/Events';
import { SceneSwitcher } from '../ui/SceneSwitcher';

/** Main nook viewer scene. */
export class MainScene extends BaseScene {
  private nookRoot?: TransformNode;
  private sceneSwitcher?: SceneSwitcher;
  private switcherVisible = true;

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

    this.setupInput();

    this.state = 'ready';
  }

  private setupInput(): void {
    const scene = this.scene as Scene;
    scene.onKeyboardObservable.add((kbInfo) => {
      if (kbInfo.type === 1 && kbInfo.event.key === 'w') { // Key down
        this.switcherVisible = !this.switcherVisible;
        this.sceneSwitcher?.setVisible(this.switcherVisible);
      }
    });
  }

  update(_deltaTime: number): void {
    if (this.state !== 'active') return;
    // Per-frame logic for main scene
  }

  onEnter(): void {
    super.onEnter();
    this.scene.clearColor = new Color4(0.02, 0.02, 0.03, 1.0);
    this.sceneSwitcher = new SceneSwitcher(this.game, this.scene);
    this.sceneSwitcher.setVisible(this.switcherVisible);
  }

  onExit(): void {
    super.onExit();
    this.sceneSwitcher?.dispose();
    this.sceneSwitcher = undefined;
    if (this.nookRoot) {
      this.nookRoot.dispose();
      this.nookRoot = undefined;
    }
  }
}