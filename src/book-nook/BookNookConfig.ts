export interface BookNookConfig {
  id: string;
  shell: string;
  interior: string;

  palette: {
    wood: string;
    wall: string;
    accent: string;
  };

  lighting: {
    color: string;
    intensity: number;
  };

  props: Array<{
    asset: string;
    position: [number, number, number];
    rotationY?: number;
    scale?: number;
  }>;
}

export interface BookNookInstance {
  root: TransformNode;
  dispose(): void;
}

import { TransformNode } from '@babylonjs/core';