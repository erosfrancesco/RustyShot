import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { EmptyPresetLibrary } from '../src/assets/AssetPresets';
import type { AssetPreset, PresetLibrary } from '../src/assets/AssetPresets';

const PRESETS_PATH = join(process.cwd(), 'data', 'presets.json');

export class AssetPresetManager {
  private library: PresetLibrary = { ...EmptyPresetLibrary };

  constructor() {
    this.load();
  }

  getAll(): readonly AssetPreset[] {
    return this.library.presets;
  }

  getByCategory(category: AssetPreset['category']): readonly AssetPreset[] {
    return this.library.presets.filter((p) => p.category === category);
  }

  getById(id: string): AssetPreset | undefined {
    return this.library.presets.find((p) => p.id === id);
  }

  addPreset(preset: AssetPreset): void {
    if (this.getById(preset.id)) {
      throw new Error(`Preset already exists: ${preset.id}`);
    }
    this.library.presets = [...this.library.presets, preset];
    this.save();
  }

  updatePreset(id: string, changes: Partial<AssetPreset>): AssetPreset | undefined {
    const index = this.library.presets.findIndex((p) => p.id === id);
    if (index === -1) return undefined;

    const updated = { ...this.library.presets[index], ...changes };
    const next = [...this.library.presets];
    next[index] = updated;
    this.library.presets = next;
    this.save();
    return updated;
  }

  removePreset(id: string): boolean {
    const next = this.library.presets.filter((p) => p.id !== id);
    if (next.length === this.library.presets.length) return false;
    this.library.presets = next;
    this.save();
    return true;
  }

  exportToDataDir(): void {
    const outDir = join(process.cwd(), 'data');
    if (!existsSync(outDir)) {
      mkdirSync(outDir, { recursive: true });
    }

    const grouped = new Map<string, AssetPreset[]>();
    for (const preset of this.library.presets) {
      const list = grouped.get(preset.category) ?? [];
      list.push(preset);
      grouped.set(preset.category, list);
    }

    for (const [category, presets] of grouped) {
      const path = join(outDir, `${category}s.json`);
      writeFileSync(path, JSON.stringify(presets, null, 2));
    }
  }

  private load(): void {
    try {
      if (existsSync(PRESETS_PATH)) {
        const raw = readFileSync(PRESETS_PATH, 'utf-8');
        const parsed = JSON.parse(raw) as PresetLibrary;
        this.library = parsed;
      }
    } catch {
      this.library = { version: '1.0.0', presets: [] };
    }
  }

  private save(): void {
    try {
      const dir = join(process.cwd(), 'data');
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
      writeFileSync(PRESETS_PATH, JSON.stringify(this.library, null, 2));
    } catch {
      // ignore write errors in restricted environments
    }
  }
}
