import { describe, it, expect } from 'vitest';
import { Inventory, ItemDefinition } from '../../src/rpg/Inventory';

const testItem: ItemDefinition = {
  id: 'test_item',
  name: 'Test Item',
  type: 'consumable',
  rarity: 'common',
  stackable: true,
  maxStack: 10,
};

const uniqueItem: ItemDefinition = {
  id: 'unique_item',
  name: 'Unique Item',
  type: 'weapon',
  rarity: 'rare',
  stackable: false,
  maxStack: 1,
};

describe('Inventory', () => {
  it('should add items', () => {
    const inventory = new Inventory();
    const result = inventory.addItem(testItem, 5);

    expect(result).toBe(true);
    expect(inventory.getItem('test_item')?.quantity).toBe(5);
  });

  it('should not stack non-stackable items', () => {
    const inventory = new Inventory();
    inventory.addItem(uniqueItem, 1);
    const result = inventory.addItem(uniqueItem, 1);

    expect(result).toBe(false);
    expect(inventory.getItem('unique_item')?.quantity).toBe(1);
  });

  it('should remove items', () => {
    const inventory = new Inventory();
    inventory.addItem(testItem, 5);
    const result = inventory.removeItem('test_item', 3);

    expect(result).toBe(true);
    expect(inventory.getItem('test_item')?.quantity).toBe(2);
  });

  it('should check if item exists', () => {
    const inventory = new Inventory();
    inventory.addItem(testItem, 3);

    expect(inventory.hasItem('test_item', 3)).toBe(true);
    expect(inventory.hasItem('test_item', 5)).toBe(false);
  });
});
