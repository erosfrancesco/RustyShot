import { Scene, PointLight, Vector3, Color3, TransformNode } from '@babylonjs/core';
import type { BookNookConfig } from './BookNookConfig';

export interface NookLights {
  main: PointLight;
  fill: PointLight;
  dispose(): void;
}

export function createNookLighting(scene: Scene, root: TransformNode, config: BookNookConfig): NookLights {
  const color = Color3.FromHexString(config.lighting.color);
  const intensity = config.lighting.intensity;

  const mainLight = new PointLight(`${config.id}_mainLight`, new Vector3(0, 1.2, 0), scene);
  mainLight.diffuse = color;
  mainLight.intensity = intensity;
  mainLight.radius = 0.1;
  mainLight.parent = root;

  const fillLight = new PointLight(`${config.id}_fillLight`, new Vector3(0, 0.8, -0.5), scene);
  fillLight.diffuse = color.scale(0.3);
  fillLight.intensity = intensity * 0.4;
  fillLight.radius = 0.1;
  fillLight.parent = root;

  return {
    main: mainLight,
    fill: fillLight,
    dispose() {
      mainLight.dispose();
      fillLight.dispose();
    },
  };
}

export function applyEmissiveWindows(root: TransformNode): void {
  root.getDescendants().forEach((node) => {
    const name = node.name.toLowerCase();
    if (name.includes('window') || name.includes('lamp') || name.includes('glow')) {
      // Emissive materials would be applied here
      // Implementation depends on material setup
    }
  });
}