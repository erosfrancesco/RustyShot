import { Entity } from '../entities/Entity';
import { StateMachine } from './StateMachine';
import { IdleState } from './behaviors/EnemyStates';

/** AI controller configuration. */
export interface AIConfig {
  readonly speed: number;
  readonly chaseRange: number;
  readonly attackRange: number;
}

/** AI controller state context. */
export interface AIContext {
  readonly speed: number;
  readonly chaseRange: number;
  readonly attackRange: number;
  targetPosition: { x: number; z: number };
}

/** AI controller that runs a state machine for enemy entities. */
export class AIController {
  private readonly stateMachine: StateMachine<AIContext>;

  constructor(_entity: Entity, _eventBus: unknown, config: AIConfig) {
    const context: AIContext = {
      targetPosition: { x: 0, z: 0 },
      speed: config.speed,
      chaseRange: config.chaseRange,
      attackRange: config.attackRange,
    };

    this.stateMachine = new StateMachine<AIContext>(context);
    this.stateMachine.setState(new IdleState());
  }

  update(deltaTime: number): void {
    this.stateMachine.update(deltaTime);
  }
}
