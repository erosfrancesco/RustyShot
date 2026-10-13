import { IComponent } from '../entities/Entity';

/** Movement speed component. */
export interface MovementComponentConfig {
  readonly speed: number;
}

/** Movement speed component. */
export class MovementComponent implements IComponent {
  readonly name = 'movement';
  private readonly speed: number;

  constructor(speed: number) {
    this.speed = speed;
  }

  getSpeed(): number {
    return this.speed;
  }

  update(_deltaTime: number): void {}

  destroy(): void {}
}
