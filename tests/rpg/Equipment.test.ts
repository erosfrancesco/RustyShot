import { describe, it, expect } from 'vitest';
import { Equipment } from '../../src/rpg/Equipment';
import type { ItemDefinition } from '../../src/rpg/Inventory';

const weaponItem: ItemDefinition = {
  id: 'pistol',
  name: 'Pistol',
  type: 'weapon',
  rarity: 'common',
  stackable: false,
  maxStack: 1,
};

describe('Equipment', () => {
  it('should equip items to valid slots', () => {
    const equipment = new Equipment();
    const result = equipment.equip(weaponItem, 'weapon');

    expect(result).toBe(true);
    expect(equipment.getEquipped('weapon')?.item.id).toBe('pistol');
  });

  it('should reject invalid slot assignments', () => {
    const equipment = new Equipment();
    const result = equipment.equip(weaponItem, 'armor');

    expect(result).toBe(false);
    expect(equipment.getEquipped('armor')).toBeUndefined();
  });

  it('should unequip items', () => {
    const equipment = new Equipment();
    equipment.equip(weaponItem, 'weapon');
    const result = equipment.unequip('weapon', 'pistol');

    expect(result).toBe(true);
    expect(equipment.getEquipped('weapon')).toBeUndefined();
  });
});
