# Main Viewer Scene

Primary runtime scene for previewing wood book nook presets in NookWorld.

## Purpose
- Load and display a selected nook preset
- Serve as the entry point when running `npm run dev`
- Provide a clean, minimal environment for evaluating nook compositions

## Key Elements
| Element | Purpose |
|---------|---------|
| `roomBase` | 4×2.4×1.2 box representing the nook enclosure |
| `floor` | 3×1 ground plane |
| `nookCamera` | ArcRotateCamera positioned for optimal nook viewing |

## Camera
- **Type**: `ArcRotateCamera`
- **Position**: `[2, 2.5, -3]`
- **Target**: `[0, 0.8, 0]`
- **Alpha**: `π/4` (45°)
- **Beta**: `π/3` (60°)
- **Radius**: 4 (min 0.5, max 12)

## Lighting
- **Ambient** (`HemisphericLight`, intensity 0.5)
- **Warm Point Light** (`PointLight` at `[0, 2.2, 0]`, intensity 0.6, warm color `#FFE4B5`)

## Metadata
```json
{
  "app": "NookWorld",
  "nookPreset": "default_nook"
}
```

## Usage
- The `nookPreset` metadata value determines which preset from `data/presets.json` is loaded at startup
- Change the value to any preset ID (e.g., `corner_reading_nook`) to preview different configurations
- The preset defines the wood type, shelf count, dimensions, and included decor/lighting

## Entry Point
Loaded automatically by `src/main.ts` → `Game` → `Game.loadAssets()` → scene setup