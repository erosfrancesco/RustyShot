export interface ItemDefinition {
  readonly id: string;
  readonly name: string;
  readonly type: 'consumable' | 'weapon' | 'armor' | 'accessory';
  readonly rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  readonly stackable: boolean;
  readonly maxStack: number;
}

export class Inventory {
  private readonly items = new Map<string, { definition: ItemDefinition; quantity: number }>();

  addItem(definition: ItemDefinition, quantity = 1): boolean {
    const existing = this.items.get(definition.id);
    if (existing) {
      if (!definition.stackable) {return false;}
      existing.quantity = Math.min(definition.maxStack, existing.quantity + quantity);
      return true;
    }

    this.items.set(definition.id, { definition, quantity });
    return true;
  }

  removeItem(itemId: string, quantity = 1): boolean {
    const entry = this.items.get(itemId);
    if (!entry) {return false;}

    entry.quantity -= quantity;
    if (entry.quantity <= 0) {
      this.items.delete(itemId);
    }
    return true;
  }

  getItem(itemId: string) {
    return this.items.get(itemId);
  }

  getAll(): Array<{ definition: ItemDefinition; quantity: number }> {
    return [...this.items.values()];
  }

  hasItem(itemId: string, quantity = 1): boolean {
    const entry = this.items.get(itemId);
    if (!entry) {return false;}
    return entry.quantity >= quantity;
  }
}
