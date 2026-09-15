# NookWorld

3D book-nook preset manager and viewer built with [Babylon.js](https://www.babylonjs.com/) and TypeScript.

## Stack

- **Engine:** Babylon.js
- **Language:** TypeScript (strict mode)
- **Build:** Vite
- **Scene Editor:** Babylon.js Editor
- **3D Assets:** Blender (GLB format)
- **2D Assets:** LibreSprite / textures (PNG format)
- **Versioning:** Git + Git LFS
- **CI/CD:** GitHub Actions
- **Tests:** Vitest
- **Linting:** ESLint
- **Formatting:** Prettier

## Quick Start

```bash
npm install
npm run dev
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server with HMR |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview production build |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Lint source files |
| `npm run lint:fix` | Lint and auto-fix source files |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run format` | Format all files with Prettier |

## Project Structure

```
├── .github/workflows/   CI/CD pipeline
├── .vscode/             VS Code settings
├── assets/              Source 3D/2D assets
├── scenes/              Babylon Editor scenes
│   ├── asset-manager/   Asset preset editor scene
│   ├── main/            Main viewer scene
│   └── test/            Isolated test scene
├── data/                Data-driven preset definitions
├── src/
│   ├── core/            Game, GameState, Events
│   ├── entities/        Scene entities
│   ├── components/      Reusable entity components
│   ├── combat/          Hit detection / interaction helpers
│   ├── physics/         PhysicsWorld, CollisionLayers
│   ├── ai/              AIController, StateMachine, behaviors
│   ├── animation/       AnimationController
│   ├── assets/          AssetManager, AssetRegistry, AssetPresets
│   ├── ui/              Editor and runtime UI
│   ├── utils/           EventEmitter
│   └── main.ts          Entry point
├── tests/               Automated tests
├── tools/               Asset preset tooling
├── AGENTS.md            AI agent project specification
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
└── .gitattributes       Git LFS configuration
```

## Architecture

- **Composition over inheritance:** Entities and preset objects are composed from reusable components.
- **Data-driven:** Wood book nook presets are defined in JSON under `data/`.
- **Event-driven:** Systems communicate via a typed event bus (`EventEmitter`).
- **3D Assets:** Loaded via Babylon's `AssetContainer` and referenced through a typed `AssetRegistry`.

## Focus

NookWorld is centered on **wood book nook** presets and assets:

- Bookshelf nooks
- Reading corner layouts
- Cozy wood-themed props and trim
- Reusable preset metadata for fast scene assembly

## Rules

- TypeScript strict mode.
- No implicit `any`.
- Keep gameplay/scene logic out of asset definition files.
- Keep nook presets data-driven.
- GLB is the runtime 3D asset format.
- Source Blender files are not modified by app code.

## License

MIT
