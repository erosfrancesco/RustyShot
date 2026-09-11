import type { Scene } from '@babylonjs/core';

export class AssetManager {
  private readonly containers = new Map<string, any>();
  private loaded = false;

  constructor(private readonly scene: Scene) {}

  async loadAll(registry: Record<string, string>): Promise<void> {
    if (this.loaded) {return;}

    const entries = Object.entries(registry);
    for (const [name, url] of entries) {
      try {
        const container = await (this.scene as any).loadAssetContainerAsync?.(url);
        if (container) {
          this.containers.set(name, container);
        }
      } catch (error) {
        console.warn(`Failed to load asset: ${name} at ${url}`, error);
      }
    }

    this.loaded = true;
  }

  getContainer(name: string): any {
    return this.containers.get(name);
  }

  instantiate(name: string): any {
    const container = this.containers.get(name);
    if (!container) {return undefined;}
    container.addAllToScene();
    return container;
  }

  remove(name: string): void {
    const container = this.containers.get(name);
    if (container) {
      container.removeAllFromScene();
      this.containers.delete(name);
    }
  }

  isLoaded(): boolean {
    return this.loaded;
  }
}
