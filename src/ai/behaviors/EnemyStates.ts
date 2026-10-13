import { StateMachine } from '../StateMachine';

/** Enemy AI state context shared across states. */
export interface EnemyContext {
  readonly stateMachine: StateMachine<EnemyContext>;
  readonly speed: number;
  readonly chaseRange: number;
  readonly attackRange: number;
  targetPosition: { x: number; z: number };
}

/** Idle AI state. */
export class IdleState {
  readonly name = 'idle';
  enter(_context: EnemyContext): void {}
  exit(_context: EnemyContext): void {}
  update(_context: EnemyContext, _deltaTime: number): void {}
}

/** Patrol AI state. */
export class PatrolState {
  readonly name = 'patrol';
  enter(_context: EnemyContext): void {}
  exit(_context: EnemyContext): void {}
  update(_context: EnemyContext, _deltaTime: number): void {}
}

/** Chase AI state. */
export class ChaseState {
  readonly name = 'chase';
  enter(_context: EnemyContext): void {}
  exit(_context: EnemyContext): void {}
  update(_context: EnemyContext, _deltaTime: number): void {}
}

/** Attack AI state. */
export class AttackState {
  readonly name = 'attack';
  enter(_context: EnemyContext): void {}
  exit(_context: EnemyContext): void {}
  update(_context: EnemyContext, _deltaTime: number): void {}
}
