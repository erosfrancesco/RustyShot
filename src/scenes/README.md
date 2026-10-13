# Book Nook Scenes

This directory contains the two main scenes for the NookWorld application, built on the **Book Nook Prefab Architecture**.

## Scene Overview

### 1. Main Scene (`main/`)
**Primary viewer** — Displays all book nook variants side-by-side for comparison.

- Loads and displays all three configured variants: `cozy-study`, `victorian-library`, `enchanted-forest`
- Camera: FreeCamera positioned for overview
- Lighting: Warm ambient + point light for atmosphere
- Controls:
  - **1** — Switch to Main Scene
  - **2** — Switch to Asset Manager Scene
  - **W** — Toggle scene switcher UI visibility

### 2. Asset Manager Scene (`asset-manager/`)
**Editor/preview scene** — Interactive variant preview and development.

- Single preview pedestal with grid ground plane
- Camera: FreeCamera positioned for close inspection
- Lighting: Hemispheric + directional for consistent preview
- Controls:
  - **1/2/3** — Scene switching
  - **W** — Toggle scene switcher UI
  - **N** — Cycle through nook variants on the preview pedestal

## Book Nook Prefab Architecture

### Core Modules (`src/book-nook/`)

| Module | Purpose |
|--------|---------|
| `BookNookConfig.ts` | TypeScript interfaces for variant configuration |
| `BookNookFactory.ts` | AssetContainer-based prefab factory with caching |
| `BookNookRegistry.ts` | Runtime registry for managing multiple nook instances |
| `BookNookMaterials.ts` | Material theming per variant palette |
| `BookNookLighting.ts` | Configurable lighting (main + fill lights per nook) |
| `variants/index.ts` | Three built-in variants + registry |

### Variant Configuration

Each variant is a plain `BookNookConfig` object:

```typescript
interface BookNookConfig {
  id: string;
  shell: string;           // Asset name for outer shell
  interior: string;        // Asset name for interior architecture
  palette: {
    wood: string;          // Hex color for wood elements
    wall: string;          // Hex color for walls/shelves
    accent: string;        // Hex color for gold/ornament accents
  };
  lighting: {
    color: string;         // Warm light color (hex)
    intensity: number;     // Light intensity multiplier
  };
  props: Array<{
    asset: string;         // Prop asset name
    position: [x, y, z];   // Local position within nook
    rotationY?: number;    // Y-axis rotation (radians)
    scale?: number;        // Uniform scale
  }>;
}
```

### Asset Pipeline

```
assets/book-nook/
├── shell.glb          # Outer book cover, base, walls, major architecture
├── interior.glb       # Stairs, shelves, fixed furniture
├── armchair.glb       # Reusable prop
├── floor-lamp.glb     # Reusable prop
├── plant.glb          # Reusable prop
├── reading-chair.glb  # Reusable prop
├── desk-lamp.glb      # Reusable prop
├── globe.glb          # Reusable prop
├── candle-set.glb     # Reusable prop
├── mushroom-stool.glb # Reusable prop
├── fairy-lights.glb   # Reusable prop
├── crystal-cluster.glb# Reusable prop
├── vine-plant.glb     # Reusable prop
└── textures/
    ├── wood_basecolor.webp
    ├── wood_normal.webp
    ├── wallpaper_basecolor.webp
    └── ...
```

**Blender workflow:**
1. Model each asset with consistent scale/origin (1 unit = 1 meter recommended)
2. Name meshes descriptively for material targeting: `Wood_Cover`, `Wall_Back`, `Shelf_01`, `Gold_Trim`, `Window_Glass`, `Lamp_Bulb`
3. Export as GLB with embedded textures or reference external textures
4. Place in `assets/book-nook/`

### Factory & Registry Pattern

```typescript
// One-time setup
const registry = new BookNookRegistry(scene);

// Create any variant at any position
const study = await registry.create('cozy-study', new Vector3(0, 0, 0));
const library = await registry.create('victorian-library', new Vector3(3, 0, 0));

// Each nook gets:
// - Independent TransformNode root (position/rotate/scale freely)
// - Own lighting (main + fill PointLights parented to root)
// - Own material instances (palette applied per-nook)
// - Proper disposal via registry.remove(id) or registry.dispose()
```

### Material Theming

Materials are applied at runtime based on mesh name patterns:

| Pattern | Material |
|---------|----------|
| `wood`, `cover`, `panel`, `trim` | Wood PBR (config.palette.wood) |
| `wall`, `floor`, `shelf` | Wall PBR (config.palette.wall) |
| `gold`, `ornament`, `accent` | Metallic PBR (config.palette.accent) |

### Lighting System

Each nook instance gets two lights parented to its root:

1. **Main light** — Warm point light at ceiling height (config.lighting.color, config.lighting.intensity)
2. **Fill light** — Weaker light toward back wall (30% color, 40% intensity)

Emissive materials for windows/lamps are applied via `applyEmissiveWindows()` (implement per asset naming).

### Adding New Variants

1. Add new config to `src/book-nook/variants/index.ts`
2. Ensure required prop assets exist in `assets/book-nook/`
3. Export and add to `nookVariants` registry object
4. Scenes automatically detect new variants

### Performance Guidelines

- **Reuse geometry** — Factory caches AssetContainers, instantiates per nook
- **Thin instances** — For repeated books/plants, use `Mesh.createInstance()` or thin instances
- **Bake details** — Fine ornaments → normal maps, not geometry
- **Share materials** — Palette creates 3 materials per variant; consider cloning only when needed
- **Selective shadows** — Enable shadows only on main light for hero nooks

## Hot Module Replacement (HMR)

Both scenes support HMR via Vite:

```bash
npm run dev
```

Edit any scene file or book-nook module — changes apply without full reload, preserving:
- WebGL context / canvas
- Engine state
- Camera position
- Active nook instances

## Scene Switching

- **Keyboard**: `1` = Main, `2` = Asset Manager
- **UI**: Click buttons in top-right (toggle with `W`)
- **Programmatic**: `game.switchScene('main')` / `game.switchScene('asset-manager')`

## Extending the Architecture

### New Prop Types
Add to variant config `props` array, ensure GLB exists in `assets/book-nook/`.

### Custom Materials
Extend `applyNookMaterials()` with additional name patterns → material mappings.

### Animated Props
Add animation groups to prop GLBs, control via `instance.animationGroups` in factory return.

### Interaction
Add clickable mesh names to config, raycast in scene update loop.

### Serialization
Variants are plain objects — save/load as JSON for user-created nooks.