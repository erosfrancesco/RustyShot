export const AssetRegistry = {
  characters: {
    player: '/assets/characters/player/player.glb',
    skeleton: '/assets/characters/enemies/skeleton.glb',
    zombie: '/assets/characters/enemies/zombie.glb',
  },
  weapons: {
    pistol: '/assets/weapons/pistol/pistol.glb',
    shotgun: '/assets/weapons/shotgun/shotgun.glb',
    rifle: '/assets/weapons/rifle/rifle.glb',
  },
  environments: {
    level_1: '/assets/environments/level_1.glb',
  },
  textures: {
    player: '/assets/textures/player_diffuse.png',
    bullet: '/assets/textures/bullet.png',
  },
} as const;

export type AssetRegistryType = typeof AssetRegistry;
