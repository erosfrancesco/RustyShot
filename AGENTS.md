# Project
NookWorld - wood book nook preset manager and viewer built with Babylon.js and TypeScript.

## Stack

- Babylon.js
- TypeScript
- Vite
- Babylon.js Editor
- Blender
- Git

## Architecture

- `src/` contains app and editor code.
- `assets/` contains source 3D/2D assets.
- `scenes/` contains Babylon Editor scenes.
- `data/` contains data-driven nook preset definitions.
- `tests/` contains automated tests.
- `tools/` contains asset preset tooling.

## Focus

- Wood book nook preset management.
- Asset registry for nook meshes and materials.
- Babylon Editor scene for creating and modifying nook presets.

## Rules

- TypeScript strict mode.
- Avoid `any`.
- Prefer composition over inheritance.
- Keep scene logic out of preset data files.
- Keep nook definitions data-driven.
- Use AssetContainer for reusable 3D assets.
- GLB is the runtime 3D asset format.
- Do not modify source Blender files unless explicitly requested.
- Do not introduce dependencies without explaining why.

## Before completing a task

1. Run TypeScript checks.
2. Run tests.
3. Run the production build.
4. Fix errors.
5. Summarize changed files.
