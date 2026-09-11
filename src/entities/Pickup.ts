import { Entity } from './Entity';
import { HealthComponent } from '../components/HealthComponent';

export interface PickupConfig {
  readonly itemId: string;
}

export class Pickup extends Entity {
  constructor(_config: PickupConfig) {
    super('pickup', ['pickup']);
    this.addComponent('health', new HealthComponent({ maxHealth: 1 }));
  }

  getHealthComponent(): HealthComponent | undefined {
    return this.getComponent<HealthComponent>('health');
  }
}
