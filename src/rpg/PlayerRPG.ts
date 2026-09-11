import { Game } from '../core/Game';
import { Stats } from './Stats';
import { Inventory } from './Inventory';
import { Equipment } from './Equipment';

export class PlayerRPG {
  private readonly stats: Stats;
  private readonly inventory: Inventory;
  private readonly equipment: Equipment;

  constructor(_game: Game) {
    this.stats = new Stats({
      health: 100,
      mana: 50,
      strength: 10,
      dexterity: 12,
      intelligence: 8,
      defense: 5,
      speed: 6,
    });

    this.inventory = new Inventory();
    this.equipment = new Equipment();
  }

  getStats(): Stats {
    return this.stats;
  }

  getInventory(): Inventory {
    return this.inventory;
  }

  getEquipment(): Equipment {
    return this.equipment;
  }
}
