import { Game } from '../core/Game';
import { HealthComponent } from '../components/HealthComponent';
import { Entity } from '../entities/Entity';

export class DamageSystem {
  constructor(private readonly game: Game) {
    const bus = game.getEventBus();
    bus.on('DamageDeal', (payload: any) => {
      this.applyDamage(payload.target, payload.amount);
    });
    bus.on('DamageHeal', (payload: any) => {
      this.applyHeal(payload.target, payload.amount);
    });
  }

  update(_deltaTime: number): void {}

  applyDamage(targetName: string, amount: number): void {
    const target = this.findEntity(targetName);
    if (!target) {return;}

    const health = (target as Entity).getComponent('health') as HealthComponent | undefined;
    if (!health) {return;}

    health.takeDamage(amount);
    this.game.getEventBus().emit('DamageDeal', {
      target: targetName,
      amount,
      source: null,
    });

    if (!health.isAlive()) {
      this.game.getEventBus().emit('EntityDeath', { entity: targetName });
    }
  }

  applyHeal(targetName: string, amount: number): void {
    const target = this.findEntity(targetName);
    if (!target) {return;}

    const health = (target as Entity).getComponent('health') as HealthComponent | undefined;
    if (!health) {return;}

    health.heal(amount);
    this.game.getEventBus().emit('DamageHeal', { target: targetName, amount });
  }

  private findEntity(name: string): any {
    const scene = this.game.getScene();
    const meshes = scene.meshes.filter((m: any) => m.metadata?.entityName === name);
    if (meshes.length > 0) {
      return (meshes[0] as any)?.entity;
    }
    return undefined;
  }
}
