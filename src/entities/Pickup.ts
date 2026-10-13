import { Entity } from './Entity';
import { HealthComponent } from '../components/HealthComponent';

/** Configuration for a pickup entity. */
export interface PickupConfig {
  readonly itemId: string;
}

/** Pickup entity for items dropped in the scene. */
export class Pickup extends Entity {
  constructor(_config: PickupConfig) {
    super('pickup', ['pickup']);
    this.addComponent('health', new HealthComponent({ maxHealth: 1 }));
  }

  getHealthComponent(): HealthComponent | undefined {
    return this.getComponent<HealthComponent>('health');
  }
}
