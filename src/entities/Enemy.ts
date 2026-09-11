import { Entity } from './Entity';
import { HealthComponent } from '../components/HealthComponent';
import { MovementComponent } from '../components/MovementComponent';
import { CombatComponent } from '../components/CombatComponent';

export interface EnemyConfig {
  readonly name: string;
  readonly maxHealth: number;
  readonly speed: number;
  readonly damage: number;
  readonly attackCooldown: number;
  readonly range: number;
}

export class Enemy extends Entity {
  constructor(config: EnemyConfig) {
    super(config.name, ['enemy']);
    this.addComponent('health', new HealthComponent({ maxHealth: config.maxHealth }));
    this.addComponent('movement', new MovementComponent(config.speed));
    this.addComponent('combat', new CombatComponent({ damage: config.damage, attackCooldown: config.attackCooldown, range: config.range }));
  }

  getHealthComponent(): HealthComponent | undefined {
    return this.getComponent<HealthComponent>('health');
  }

  getMovementComponent(): MovementComponent | undefined {
    return this.getComponent<MovementComponent>('movement');
  }

  getCombatComponent(): CombatComponent | undefined {
    return this.getComponent<CombatComponent>('combat');
  }
}
