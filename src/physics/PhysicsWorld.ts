import { Scene, AbstractMesh } from '@babylonjs/core';
import { Entity } from '../entities/Entity';
import { CollisionLayers } from './CollisionLayers';

export class PhysicsWorld {
  private enabled = false;

  constructor(private readonly scene: Scene) {}

  async enablePhysics(gravity: { x: number; y: number; z: number }): Promise<void> {
    try {
      const core = await import('@babylonjs/core');
      if ('HavokPlugin' in core) {
        const plugin = new (core as any).HavokPlugin(true);
        this.scene.enablePhysics(gravity as any, plugin as any);
        this.enabled = true;
      }
    } catch {
      console.warn('Physics engine not available.');
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  registerEntity(entity: Entity): void {
    if (!this.enabled) {return;}
    const render = entity.getComponent<any>('render');
    if (!render) {return;}
    const mesh = (render as any).mesh;
    if (!mesh || !mesh.physicsImpostor) {return;}

    if (entity.hasTag('player')) {
      this.setCollisionLayer(mesh, CollisionLayers.Player);
    } else if (entity.hasTag('enemy')) {
      this.setCollisionLayer(mesh, CollisionLayers.Enemy);
    } else if (entity.hasTag('projectile')) {
      this.setCollisionLayer(mesh, CollisionLayers.Projectile);
    } else if (entity.hasTag('pickup')) {
      this.setCollisionLayer(mesh, CollisionLayers.Pickup);
    }
  }

  private setCollisionLayer(_mesh: AbstractMesh, _layer: number): void {
    // Collision layer assignment is handled by Babylon physics impostor
  }
}
