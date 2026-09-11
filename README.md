# RustyShot

Top-down RPG/shooter built with [Babylon.js](https://www.babylonjs.com/) and TypeScript.

## Stack

- **Engine:** Babylon.js
- **Language:** TypeScript (strict mode)
- **Build:** Vite
- **Scene Editor:** Babylon.js Editor
- **3D Assets:** Blender (GLB format)
- **2D Assets:** LibreSprite (PNG format)
- **AI Runtime:** OpenCode + Ollama
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
├── assets/              Source assets (characters, weapons, textures, audio)
├── scenes/              Babylon Editor scenes
├── data/                Data-driven game definitions
├── src/
│   ├── core/            Game, GameState, Events
│   ├── entities/        Player, Enemy, Projectile, Pickup
│   ├── components/      Reusable entity components
│   ├── combat/          Combat, Damage, Weapons, HitDetection
│   ├── physics/         PhysicsWorld, CollisionLayers
│   ├── ai/              AIController, StateMachine, behaviors
│   ├── animation/       AnimationController
│   ├── assets/          AssetManager, AssetRegistry
│   ├── rpg/             Stats, Inventory, Equipment, Loot
│   ├── ui/              Game UI
│   ├── utils/           EventEmitter
│   └── main.ts          Entry point
├── tests/               Automated tests
├── AGENTS.md            AI agent project specification
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
└── .gitattributes       Git LFS configuration
```

## Architecture

- **Composition over inheritance:** Entities are composed of reusable components rather than deep class hierarchies.
- **Data-driven:** Weapons, enemies, items, and levels are defined in JSON under `data/`.
- **Event-driven:** Systems communicate via a typed event bus (`EventEmitter`).
- **3D Assets:** Loaded via Babylon's `AssetContainer` and referenced through a typed `AssetRegistry`.

## Rules

- TypeScript strict mode.
- No implicit `any`.
- Gameplay logic stays out of scene files.
- Weapons and enemies are data-driven.
- GLB is the runtime 3D asset format.
- Source Blender files are not modified by game code.

## License

MIT
