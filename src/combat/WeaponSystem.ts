import { Game } from '../core/Game';

export interface WeaponDefinition {
  readonly id: string;
  readonly damage: number;
  readonly fireRate: number;
  readonly projectileSpeed: number;
  readonly projectileLifetime: number;
}

export class WeaponSystem {
  private readonly definitions = new Map<string, WeaponDefinition>();
  private lastFireTime = 0;

  constructor(private readonly game: Game) {
    const bus = game.getEventBus();
    bus.on('ProjectileFire', (payload: any) => {
      this.handleFire(payload.source, payload.weaponId);
    });
  }

  registerWeapon(definition: WeaponDefinition): void {
    this.definitions.set(definition.id, definition);
  }

  update(deltaTime: number): void {
    this.lastFireTime += deltaTime;
  }

  private handleFire(_sourceName: string, weaponId: string): void {
    const weapon = this.definitions.get(weaponId);
    if (!weapon) {return;}

    this.game.getEventBus().emit('ProjectileHit', {
      projectile: 'projectile',
      target: 'unknown',
      damage: weapon.damage,
    });
  }
}
