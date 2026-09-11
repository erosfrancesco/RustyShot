# Project
Top-down RPG/shooter built with Babylon.js and TypeScript.

## Stack

- Babylon.js
- TypeScript
- Vite
- Babylon.js Editor
- Blender
- Git

## Architecture

- `src/` contains gameplay code.
- `assets/` contains source/game assets.
- `scenes/` contains Babylon Editor scenes.
- `data/` contains data-driven game definitions.
- `tests/` contains automated tests.

## Rules

- TypeScript strict mode.
- Avoid `any`.
- Prefer composition over inheritance.
- Keep gameplay logic outside scene files.
- Keep weapons data-driven.
- Keep enemy definitions data-driven.
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
