export interface StatBlock {
  readonly health: number;
  readonly mana: number;
  readonly strength: number;
  readonly dexterity: number;
  readonly intelligence: number;
  readonly defense: number;
  readonly speed: number;
}

export class Stats implements StatBlock {
  health: number;
  mana: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  defense: number;
  speed: number;

  constructor(initial: StatBlock) {
    this.health = initial.health;
    this.mana = initial.mana;
    this.strength = initial.strength;
    this.dexterity = initial.dexterity;
    this.intelligence = initial.intelligence;
    this.defense = initial.defense;
    this.speed = initial.speed;
  }

  applyModifier(stat: keyof StatBlock, delta: number): void {
    const current = this[stat] as number;
    this[stat] = Math.max(0, current + delta);
  }
}
