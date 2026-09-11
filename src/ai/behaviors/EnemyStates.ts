export interface EnemyContext {
  readonly speed: number;
  readonly chaseRange: number;
  readonly attackRange: number;
  targetPosition: { x: number; z: number };
}

export class IdleState {
  readonly name = 'idle';
  enter(_context: EnemyContext): void {}
  exit(_context: EnemyContext): void {}
  update(_context: EnemyContext, _deltaTime: number): void {}
}

export class PatrolState {
  readonly name = 'patrol';
  enter(_context: EnemyContext): void {}
  exit(_context: EnemyContext): void {}
  update(_context: EnemyContext, _deltaTime: number): void {}
}

export class ChaseState {
  readonly name = 'chase';
  enter(_context: EnemyContext): void {}
  exit(_context: EnemyContext): void {}
  update(_context: EnemyContext, _deltaTime: number): void {}
}

export class AttackState {
  readonly name = 'attack';
  enter(_context: EnemyContext): void {}
  exit(_context: EnemyContext): void {}
  update(_context: EnemyContext, _deltaTime: number): void {}
}
