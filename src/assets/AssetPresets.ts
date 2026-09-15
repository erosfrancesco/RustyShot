export interface AssetPreset {
  readonly id: string;
  readonly label: string;
  readonly category: 'weapon' | 'enemy' | 'item' | 'environment';
  readonly tags: readonly string[];
  readonly glbPath: string;
  readonly thumbnail?: string;
  readonly properties: Record<string, unknown>;
}

export interface PresetLibrary {
  readonly version: string;
  presets: AssetPreset[];
}

export const EmptyPresetLibrary: PresetLibrary = {
  version: '1.0.0',
  presets: [],
};
