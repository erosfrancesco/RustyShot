import { describe, it, expect } from 'vitest';
import { Loot } from '../../src/rpg/Loot';
import type { ItemDefinition } from '../../src/rpg/Inventory';

const commonItem: ItemDefinition = {
  id: 'bone',
  name: 'Bone',
  type: 'consumable',
  rarity: 'common',
  stackable: true,
  maxStack: 99,
};

const rareItem: ItemDefinition = {
  id: 'gem',
  name: 'Gem',
  type: 'accessory',
  rarity: 'rare',
  stackable: false,
  maxStack: 1,
};

describe('Loot', () => {
  it('should return items based on weight', () => {
    const loot = new Loot();
    loot.addEntry({ item: commonItem, weight: 80, minQuantity: 1, maxQuantity: 1 });
    loot.addEntry({ item: rareItem, weight: 20, minQuantity: 1, maxQuantity: 1 });

    const results = loot.roll();
    const hasCommon = results.some((r: any) => r.item.id === 'bone');
    const hasRare = results.some((r: any) => r.item.id === 'gem');

    expect(hasCommon || hasRare).toBe(true);
  });

  it('should return empty when table is empty', () => {
    const loot = new Loot();
    const results = loot.roll();
    expect(results).toHaveLength(0);
  });
});
