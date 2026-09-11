export interface IComponent {
  readonly name: string;
  update(deltaTime: number): void;
  destroy(): void;
}

export class Entity {
  private readonly components = new Map<string, IComponent>();
  private active = true;

  constructor(
    public readonly name: string,
    public readonly tags: string[] = [],
  ) {}

  addComponent(key: string, component: IComponent): this {
    if (!this.active) {return this;}
    this.components.set(key, component);
    return this;
  }

  getComponent<T extends IComponent>(key: string): T | undefined {
    return this.components.get(key) as T | undefined;
  }

  hasTag(tag: string): boolean {
    return this.tags.includes(tag);
  }

  update(deltaTime: number): void {
    if (!this.active) {return;}
    for (const component of this.components.values()) {
      component.update(deltaTime);
    }
  }

  removeComponent(key: string): boolean {
    const component = this.components.get(key);
    if (component) {
      component.destroy();
      this.components.delete(key);
      return true;
    }
    return false;
  }

  destroy(): void {
    this.active = false;
    for (const component of this.components.values()) {
      component.destroy();
    }
    this.components.clear();
  }
}
