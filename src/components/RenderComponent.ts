import { IComponent } from '../entities/Entity';
import { Mesh } from '@babylonjs/core';

export interface RenderComponentConfig {
  readonly mesh: Mesh;
}

export class RenderComponent implements IComponent {
  readonly name = 'render';
  private readonly mesh: Mesh;
  private visible = true;

  constructor(config: RenderComponentConfig) {
    this.mesh = config.mesh;
  }

  show(): void {
    this.visible = true;
    this.mesh.setEnabled(true);
  }

  hide(): void {
    this.visible = false;
    this.mesh.setEnabled(false);
  }

  toggle(): void {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  update(_deltaTime: number): void {}

  destroy(): void {
    this.mesh.dispose();
  }
}
