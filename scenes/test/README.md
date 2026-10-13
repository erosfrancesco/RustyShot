# Test Scene

Isolated scene for validating nook preset loading and interaction logic.

## Purpose
- Unit/integration testing of preset loading
- Debugging asset instantiation without full game loop
- Quick iteration on physics, collision, or interaction code

## Key Elements
| Element | Purpose |
|---------|---------|
| `ground` | 4×4 ground plane |
| `arcRotateCamera` | Fixed orbit camera for consistent test views |

## Camera
- **Type**: `ArcRotateCamera`
- **Position**: `[0, 2, -3]`
- **Target**: `[0, 0.6, 0]`
- **Alpha**: `π/2` (90°)
- **Beta**: `π/3` (60°)
- **Radius**: 3.5

## Lighting
- **Ambient** (`HemisphericLight`, intensity 0.6)

## Metadata
```json
{
  "app": "NookWorld",
  "testMode": "nook-preset"
}
```

## Usage
- Open in Babylon.js Editor to visually verify preset loading
- Use `scene.getMeshByName('...')` in console to inspect loaded meshes
- Add test scripts via the Editor's script system for automated assertions

## Running Tests
```bash
npm run test:run
```
This runs Vitest unit tests (`tests/`) — the test scene itself is for manual/visual validation.