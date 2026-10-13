import {
  Scene,
  TransformNode,
  Vector3,
  AssetContainer,
  SceneLoader,
  MeshBuilder,
  Mesh,
  type InstantiatedEntries,
} from '@babylonjs/core';
import type { BookNookConfig, BookNookInstance } from './BookNookConfig';

export class BookNookFactory {
  private cache = new Map<string, AssetContainer>();
  private loading = new Map<string, Promise<AssetContainer>>();
  private useFallback = false;

  constructor(private scene: Scene) {}

  private async loadAsset(name: string): Promise<AssetContainer> {
    const existing = this.loading.get(name);
    if (existing) return existing;

    if (this.useFallback) {
      return this.createFallbackAsset(name);
    }

    const promise = SceneLoader.LoadAssetContainerAsync(`/assets/book-nook/`, `${name}.glb`, this.scene);
    this.loading.set(name, promise);

    try {
      const container = await promise;
      this.cache.set(name, container);
      return container;
    } catch (error) {
      console.warn(`Failed to load ${name}.glb, using fallback:`, error);
      this.useFallback = true;
      this.loading.delete(name);
      return this.createFallbackAsset(name);
    }
  }

  private createFallbackAsset(name: string): AssetContainer {
    const container = new AssetContainer(this.scene);

    let mesh: Mesh;
    switch (name) {
      case 'shell': {
        // Book-shaped outer shell
        mesh = MeshBuilder.CreateBox(`${name}_box`, { width: 1.2, height: 1.8, depth: 0.3 }, this.scene);
        mesh.position.y = 0.9;
        break;
      }
      case 'interior': {
        // Interior floor + back wall + shelves
        mesh = new Mesh(`${name}_root`, this.scene);
        const floor = MeshBuilder.CreateBox('floor', { width: 1.0, height: 0.05, depth: 0.9 }, this.scene);
        floor.position.set(0, 0.025, -0.15);
        floor.parent = mesh;
        const backWall = MeshBuilder.CreateBox('backWall', { width: 1.0, height: 1.6, depth: 0.05 }, this.scene);
        backWall.position.set(0, 0.8, -0.6);
        backWall.parent = mesh;
        const shelf1 = MeshBuilder.CreateBox('shelf1', { width: 0.9, height: 0.03, depth: 0.25 }, this.scene);
        shelf1.position.set(0, 0.5, -0.45);
        shelf1.parent = mesh;
        const shelf2 = MeshBuilder.CreateBox('shelf2', { width: 0.9, height: 0.03, depth: 0.25 }, this.scene);
        shelf2.position.set(0, 0.9, -0.45);
        shelf2.parent = mesh;
        break;
      }
      case 'armchair':
      case 'reading-chair':
      case 'mushroom-stool': {
        mesh = MeshBuilder.CreateCylinder(`${name}_cyl`, { height: 0.6, diameterTop: 0.35, diameterBottom: 0.4 }, this.scene);
        mesh.position.y = 0.3;
        break;
      }
      case 'floor-lamp':
      case 'desk-lamp':
      case 'fairy-lights': {
        mesh = MeshBuilder.CreateCylinder(`${name}_cyl`, { height: 1.2, diameterTop: 0.05, diameterBottom: 0.08 }, this.scene);
        mesh.position.y = 0.6;
        break;
      }
      case 'plant':
      case 'vine-plant': {
        mesh = MeshBuilder.CreateSphere(`${name}_sph`, { diameter: 0.4 }, this.scene);
        mesh.position.y = 0.2;
        break;
      }
      case 'globe':
      case 'crystal-cluster': {
        mesh = MeshBuilder.CreateSphere(`${name}_sph`, { diameter: 0.25 }, this.scene);
        mesh.position.y = 0.8;
        break;
      }
      case 'candle-set': {
        mesh = MeshBuilder.CreateBox(`${name}_box`, { width: 0.2, height: 0.3, depth: 0.2 }, this.scene);
        mesh.position.y = 0.95;
        break;
      }
      default: {
        mesh = MeshBuilder.CreateBox(`${name}_box`, { size: 0.3 }, this.scene);
        mesh.position.y = 0.15;
      }
    }

    mesh.name = name;
    container.meshes.push(mesh);
    return container;
  }

  async create(config: BookNookConfig, position = Vector3.Zero()): Promise<BookNookInstance> {
    const root = new TransformNode(`BookNook_${config.id}`, this.scene);
    root.position.copyFrom(position);

    const entries: InstantiatedEntries[] = [];

    try {
      const assetNames = [
        ...new Set([
          config.shell,
          config.interior,
          ...config.props.map((p) => p.asset),
        ]),
      ];

      const containers = await Promise.all(assetNames.map((name) => this.loadAsset(name)));
      const byName = new Map(assetNames.map((name, i) => [name, containers[i]]));

      for (const name of [config.shell, config.interior]) {
        const container = byName.get(name);
        if (!container) throw new Error(`Asset not loaded: ${name}`);
        const entry = container.instantiateModelsToScene();
        entries.push(entry);

        for (const node of entry.rootNodes) {
          node.parent = root;
        }
      }

      for (const prop of config.props) {
        const container = byName.get(prop.asset);
        if (!container) throw new Error(`Asset not loaded: ${prop.asset}`);
        const entry = container.instantiateModelsToScene();
        entries.push(entry);

        const propRoot = new TransformNode(`${config.id}_${prop.asset}`, this.scene);
        propRoot.parent = root;
        propRoot.position = Vector3.FromArray(prop.position);
        propRoot.rotation.y = prop.rotationY ?? 0;
        propRoot.scaling.setAll(prop.scale ?? 1);

        for (const node of entry.rootNodes) {
          node.parent = propRoot;
        }
      }

      return {
        root,
        dispose() {
          for (const entry of entries) {
            entry.dispose();
          }
          root.dispose(false, false);
        },
      };
    } catch (error) {
      for (const entry of entries) {
        entry.dispose();
      }
      root.dispose(false, false);
      throw error;
    }
  }

  dispose() {
    for (const container of this.cache.values()) {
      container.dispose();
    }
    this.cache.clear();
    this.loading.clear();
  }
}