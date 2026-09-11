import { IComponent } from '../entities/Entity';

export interface ProjectileComponentConfig {
  readonly lifetime: number;
  readonly damage: number;
}

export class ProjectileComponent implements IComponent {
  readonly name = 'projectile';
  private readonly lifetime: number;
  private readonly damage: number;
  private elapsed = 0;

  constructor(config: ProjectileComponentConfig) {
    this.lifetime = config.lifetime;
    this.damage = config.damage;
  }

  update(deltaTime: number): void {
    this.elapsed += deltaTime;
  }

  isExpired(): boolean {
    return this.elapsed >= this.lifetime;
  }

  getDamage(): number {
    return this.damage;
  }

  destroy(): void {}
}
