import { Scene, Vector3 } from '@babylonjs/core';
import { BookNookFactory } from './BookNookFactory';
import type { BookNookConfig, BookNookInstance } from './BookNookConfig';
import { nookVariants } from './variants';
import { applyNookMaterials } from './BookNookMaterials';
import { createNookLighting, NookLights } from './BookNookLighting';

export interface RegisteredNook {
  instance: BookNookInstance;
  lights: NookLights;
  config: BookNookConfig;
}

export class BookNookRegistry {
  private factory: BookNookFactory;
  private nooks = new Map<string, RegisteredNook>();

  constructor(scene: Scene) {
    this.factory = new BookNookFactory(scene);
  }

  async create(variantId: keyof typeof nookVariants, position = Vector3.Zero(), id?: string): Promise<RegisteredNook> {
    const config = nookVariants[variantId];
    if (!config) {
      throw new Error(`Unknown nook variant: ${variantId}`);
    }

    const instance = await this.factory.create(config, position);
    const lights = createNookLighting(instance.root.getScene(), instance.root, config);
    applyNookMaterials(instance.root.getScene(), instance.root, config);

    const nookId = id ?? `${config.id}_${this.nooks.size}`;
    const registered: RegisteredNook = { instance, lights, config };
    this.nooks.set(nookId, registered);

    return registered;
  }

  get(id: string): RegisteredNook | undefined {
    return this.nooks.get(id);
  }

  remove(id: string): boolean {
    const nook = this.nooks.get(id);
    if (!nook) return false;

    nook.instance.dispose();
    nook.lights.dispose();
    this.nooks.delete(id);
    return true;
  }

  dispose(): void {
    for (const nook of this.nooks.values()) {
      nook.instance.dispose();
      nook.lights.dispose();
    }
    this.nooks.clear();
    this.factory.dispose();
  }

  getAll(): RegisteredNook[] {
    return Array.from(this.nooks.values());
  }

  getFactory(): BookNookFactory {
    return this.factory;
  }
}