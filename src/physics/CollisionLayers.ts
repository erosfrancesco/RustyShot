export const CollisionLayers = {
  Player: 1,
  Enemy: 2,
  Projectile: 3,
  Pickup: 4,
  Environment: 5,
  mask: {
    player: 2 | 5,
    enemy: 1 | 5,
    projectile: 1 | 2,
    pickup: 1,
  },
} as const;
