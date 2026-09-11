import type { ItemDefinition } from './Inventory';

export interface EquippedItem {
  readonly slot: 'weapon' | 'armor' | 'accessory';
  readonly item: ItemDefinition;
}

export class Equipment {
  private readonly equipped = new Map<string, EquippedItem>();

  equip(item: ItemDefinition, slot: 'weapon' | 'armor' | 'accessory'): boolean {
    if (item.type === 'weapon' && slot !== 'weapon') {return false;}
    if (item.type === 'armor' && slot !== 'armor') {return false;}
    if (item.type === 'accessory' && slot !== 'accessory') {return false;}

    this.equipped.set(`${slot}:${item.id}`, { slot, item });
    return true;
  }

  unequip(slot: 'weapon' | 'armor' | 'accessory', itemId: string): boolean {
    return this.equipped.delete(`${slot}:${itemId}`);
  }

  getEquipped(slot: 'weapon' | 'armor' | 'accessory'): EquippedItem | undefined {
    return [...this.equipped.values()].find((e) => e.slot === slot);
  }

  getAll(): EquippedItem[] {
    return [...this.equipped.values()];
  }
}
