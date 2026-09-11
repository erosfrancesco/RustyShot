import { Game } from '../core/Game';

export class CombatSystem {
  constructor(private readonly game: Game) {
    const bus = game.getEventBus();
    bus.on('EntityDeath', (payload: any) => {
      console.log(`Entity ${payload.entity} died`);
    });
  }

  update(_deltaTime: number): void {}

  fireWeapon(_source: unknown, _targetPosition: unknown, weaponId: string): void {
    this.game.getEventBus().emit('ProjectileFire', {
      source: 'player',
      weaponId,
    });
  }
}
