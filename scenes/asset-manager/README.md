# Asset Manager Scene

Scene for creating, previewing, and exporting wood book nook presets.

## Purpose
- Preview GLB assets on the central pedestal
- Inspect and edit preset metadata in the Babylon.js Editor inspector
- Export presets to `data/presets.json` and category-specific JSON files

## Key Elements
| Element | Purpose |
|---------|---------|
| `previewPedestal` | Cylinder base for centering previewed GLB assets |
| `gridHelper` | 30×30 unit grid for scale reference |
| `editorCamera` | ArcRotateCamera (radius 15, beta π/3) for orbiting around assets |

## Lighting
- **Ambient** (`HemisphericLight`, intensity 0.6)
- **Directional** (`DirectionalLight`, intensity 0.8, direction `[-1, -2, -1]`)

## Metadata
The scene's `metadata.presets` object groups presets by category:
- `nooks`
- `shelves`
- `books`
- `lighting`
- `decor`
- `trim`

## Workflow
1. Open `asset-manager.scene` in Babylon.js Editor
2. Drag GLB assets onto the pedestal or into the scene
3. Fill in preset metadata via the inspector
4. Run `node tools/AssetPresetManager.ts` to sync changes to `data/presets.json` and category-specific files in `data/`

## Script Entry Point
`tools/AssetPresetManager.ts` — reads/writes `data/presets.json` and exports to `data/nooks.json`, `data/shelves.json`, etc.