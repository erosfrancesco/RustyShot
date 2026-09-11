import type { ItemDefinition } from './Inventory';

export interface LootEntry {
  readonly item: ItemDefinition;
  readonly weight: number;
  readonly minQuantity: number;
  readonly maxQuantity: number;
}

export class Loot {
  private readonly table: LootEntry[] = [];

  addEntry(entry: LootEntry): void {
    this.table.push(entry);
  }

  roll(): LootEntry[] {
    const totalWeight = this.table.reduce((sum, entry) => sum + entry.weight, 0);
    if (totalWeight === 0) {return [];}

    const result: LootEntry[] = [];
    let remaining = totalWeight;

    for (const entry of this.table) {
      if (remaining <= 0) {break;}
      const roll = Math.random() * remaining;
      if (roll < entry.weight) {
        const quantity = Math.floor(Math.random() * (entry.maxQuantity - entry.minQuantity + 1)) + entry.minQuantity;
        for (let i = 0; i < quantity; i++) {
          result.push(entry);
        }
        remaining -= entry.weight;
      }
    }

    return result;
  }

  static fromWeights(entries: Array<{ item: ItemDefinition; weight: number }>): Loot {
    const loot = new Loot();
    for (const entry of entries) {
      loot.addEntry({ ...entry, minQuantity: 1, maxQuantity: 1 });
    }
    return loot;
  }
}
