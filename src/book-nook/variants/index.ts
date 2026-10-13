import type { BookNookConfig } from '../BookNookConfig';

export const cozyStudy: BookNookConfig = {
  id: 'cozy-study',
  shell: 'shell',
  interior: 'interior',
  palette: {
    wood: '#68432F',
    wall: '#D6BE9C',
    accent: '#B87942',
  },
  lighting: {
    color: '#FFBC78',
    intensity: 1.4,
  },
  props: [
    { asset: 'armchair', position: [-0.35, 0, 0.2], rotationY: 0.4 },
    { asset: 'floor-lamp', position: [0.55, 0, -0.3], scale: 0.9 },
    { asset: 'plant', position: [0.7, 0, 0.35], scale: 0.8 },
  ],
};

export const victorianLibrary: BookNookConfig = {
  id: 'victorian-library',
  shell: 'shell',
  interior: 'interior',
  palette: {
    wood: '#3D2B1F',
    wall: '#E8D5B7',
    accent: '#C9A84C',
  },
  lighting: {
    color: '#FFD4A3',
    intensity: 1.2,
  },
  props: [
    { asset: 'reading-chair', position: [-0.4, 0, 0.15], rotationY: 0.3 },
    { asset: 'desk-lamp', position: [0.5, 0.7, -0.2], scale: 1.0 },
    { asset: 'globe', position: [0.6, 0.7, 0.25], scale: 0.7 },
    { asset: 'candle-set', position: [-0.6, 0.7, 0.3], scale: 0.8 },
  ],
};

export const enchantedForest: BookNookConfig = {
  id: 'enchanted-forest',
  shell: 'shell',
  interior: 'interior',
  palette: {
    wood: '#2D4A2B',
    wall: '#A8D5BA',
    accent: '#5FB878',
  },
  lighting: {
    color: '#A8FFBC',
    intensity: 1.6,
  },
  props: [
    { asset: 'mushroom-stool', position: [-0.3, 0, 0.1], rotationY: 0.5 },
    { asset: 'fairy-lights', position: [0, 1.2, 0], scale: 1.2 },
    { asset: 'crystal-cluster', position: [0.5, 0, -0.2], scale: 0.9 },
    { asset: 'vine-plant', position: [-0.5, 0, 0.4], scale: 1.0 },
  ],
};

export const simpleOak: BookNookConfig = {
  id: 'simple-oak',
  shell: 'shell',
  interior: 'interior',
  palette: {
    wood: '#A0522D',  // Oak/sienna
    wall: '#F5F0E8',  // Light cream walls
    accent: '#C9A84C', // Warm brass
  },
  lighting: {
    color: '#FFF8E7',  // Warm white
    intensity: 2.0,    // Bright single light from above
  },
  props: [],  // Empty inside
};

export const nookVariants = {
  'cozy-study': cozyStudy,
  'victorian-library': victorianLibrary,
  'enchanted-forest': enchantedForest,
  'simple-oak': simpleOak,
} as const;