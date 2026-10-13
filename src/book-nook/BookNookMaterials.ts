import { Scene, StandardMaterial, Color3, PBRMaterial, TransformNode, Mesh, Node } from '@babylonjs/core';
import type { BookNookConfig } from './BookNookConfig';

export function applyNookMaterials(scene: Scene, root: TransformNode, config: BookNookConfig): void {
  const woodMat = createWoodMaterial(scene, config.palette.wood);
  const wallMat = createWallMaterial(scene, config.palette.wall);
  const accentMat = createAccentMaterial(scene, config.palette.accent);

  root.getDescendants().forEach((node: Node) => {
    if (!(node instanceof Mesh)) return;
    if (!node.material) return;
    const name = node.name.toLowerCase();

    if (name.includes('wood') || name.includes('cover') || name.includes('panel') || name.includes('trim')) {
      node.material = woodMat;
    } else if (name.includes('wall') || name.includes('floor') || name.includes('shelf')) {
      node.material = wallMat;
    } else if (name.includes('gold') || name.includes('ornament') || name.includes('accent')) {
      node.material = accentMat;
    }
  });
}

function createWoodMaterial(scene: Scene, colorHex: string): PBRMaterial {
  const mat = new PBRMaterial('woodMat', scene);
  mat.albedoColor = Color3.FromHexString(colorHex);
  mat.roughness = 0.55;
  mat.metallic = 0.0;
  return mat;
}

function createWallMaterial(scene: Scene, colorHex: string): PBRMaterial {
  const mat = new PBRMaterial('wallMat', scene);
  mat.albedoColor = Color3.FromHexString(colorHex);
  mat.roughness = 0.7;
  mat.metallic = 0.0;
  return mat;
}

function createAccentMaterial(scene: Scene, colorHex: string): PBRMaterial {
  const mat = new PBRMaterial('accentMat', scene);
  mat.albedoColor = Color3.FromHexString(colorHex);
  mat.roughness = 0.2;
  mat.metallic = 0.8;
  return mat;
}

export function createEmissiveMaterial(scene: Scene, colorHex: string, intensity = 1.0): StandardMaterial {
  const mat = new StandardMaterial('emissiveMat', scene);
  mat.emissiveColor = Color3.FromHexString(colorHex).scale(intensity);
  mat.disableLighting = true;
  return mat;
}