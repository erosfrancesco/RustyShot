export interface GameEventPayloads extends Record<string, unknown> {
  'game:state-change': { from: string; to: string };
  'entity:spawn': { entity: string; kind: string };
  'entity:death': { entity: string };
  'projectile:fire': { source: string; weaponId: string };
  'projectile:hit': { projectile: string; target: string; damage: number };
  'damage:deal': { target: string; amount: number; source: string | null };
  'damage:heal': { target: string; amount: number };
  'item:pickup': { entity: string; itemId: string };
  'level:complete': { levelId: string };
  'level:start': { levelId: string };
}

export const GameEvents = {
  StateChange: 'game:state-change',
  EntitySpawn: 'entity:spawn',
  EntityDeath: 'entity:death',
  ProjectileFire: 'projectile:fire',
  ProjectileHit: 'projectile:hit',
  DamageDeal: 'damage:deal',
  DamageHeal: 'damage:heal',
  ItemPickup: 'item:pickup',
  LevelComplete: 'level:complete',
  LevelStart: 'level:start',
} as const;

export type GameEventMap = GameEventPayloads;
