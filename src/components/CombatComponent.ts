import { IComponent } from '../entities/Entity';

export interface CombatComponentConfig {
  readonly damage: number;
  readonly attackCooldown: number;
  readonly range: number;
}

export class CombatComponent implements IComponent {
  readonly name = 'combat';
  private readonly damage: number;
  private readonly attackCooldown: number;
  private readonly range: number;
  private lastAttackTime = 0;

  constructor(config: CombatComponentConfig) {
    this.damage = config.damage;
    this.attackCooldown = config.attackCooldown;
    this.range = config.range;
  }

  canAttack(currentTime: number): boolean {
    return currentTime - this.lastAttackTime >= this.attackCooldown;
  }

  recordAttack(currentTime: number): void {
    this.lastAttackTime = currentTime;
  }

  getDamage(): number {
    return this.damage;
  }

  getRange(): number {
    return this.range;
  }

  update(_deltaTime: number): void {}

  destroy(): void {}
}
