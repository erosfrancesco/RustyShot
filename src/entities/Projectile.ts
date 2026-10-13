import { Entity } from './Entity';
import { HealthComponent } from '../components/HealthComponent';
import { ProjectileComponent } from '../components/ProjectileComponent';

/** Configuration for a projectile entity. */
export interface ProjectileConfig {
  readonly lifetime: number;
  readonly damage: number;
}

/** Projectile entity with lifetime and damage. */
export class Projectile extends Entity {
  constructor(config: ProjectileConfig) {
    super('projectile', ['projectile']);
    this.addComponent('health', new HealthComponent({ maxHealth: 1 }));
    this.addComponent('projectile', new ProjectileComponent({ lifetime: config.lifetime, damage: config.damage }));
  }

  getProjectileComponent(): ProjectileComponent | undefined {
    return this.getComponent<ProjectileComponent>('projectile');
  }
}
