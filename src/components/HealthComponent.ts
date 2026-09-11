import { IComponent } from '../entities/Entity';

export interface HealthComponentConfig {
  readonly maxHealth: number;
}

export class HealthComponent implements IComponent {
  readonly name = 'health';
  private currentHealth: number;
  private readonly maxHealth: number;

  constructor(config: HealthComponentConfig) {
    this.maxHealth = config.maxHealth;
    this.currentHealth = config.maxHealth;
  }

  getHealth(): number {
    return this.currentHealth;
  }

  getMaxHealth(): number {
    return this.maxHealth;
  }

  takeDamage(amount: number): void {
    this.currentHealth = Math.max(0, this.currentHealth - amount);
  }

  heal(amount: number): void {
    this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount);
  }

  isAlive(): boolean {
    return this.currentHealth > 0;
  }

  update(_deltaTime: number): void {}

  destroy(): void {}
}
