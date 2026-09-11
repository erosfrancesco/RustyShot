import { describe, it, expect } from 'vitest';
import { Stats } from '../../src/rpg/Stats';

describe('Stats', () => {
  it('should initialize with provided values', () => {
    const stats = new Stats({
      health: 100,
      mana: 50,
      strength: 10,
      dexterity: 12,
      intelligence: 8,
      defense: 5,
      speed: 6,
    });

    expect(stats.health).toBe(100);
    expect(stats.strength).toBe(10);
  });

  it('should apply modifiers correctly', () => {
    const stats = new Stats({
      health: 100,
      mana: 50,
      strength: 10,
      dexterity: 12,
      intelligence: 8,
      defense: 5,
      speed: 6,
    });

    stats.applyModifier('strength', 5);
    expect(stats.strength).toBe(15);

    stats.applyModifier('health', -30);
    expect(stats.health).toBe(70);

    stats.applyModifier('health', -100);
    expect(stats.health).toBe(0);
  });
});
