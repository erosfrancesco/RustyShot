# babylonjs-typescript-starter

This is a minimalist starter kit for Babylon.js using Vite instead of webpack.

To start the dev server, run: `yarn dev`.

The sample scene from this guide is included: https://doc.babylonjs.com/guidedLearning/createAGame/gettingSetUp


## Commands

### `yarn dev`

Start the local development server with HMR.

### `yarn build`

Generate a production build to directory specified by `--outDir`.

### `yarn preview`

Start a server to preview the static files of the production build.

### `yarn lint`

Lint files. Specify `--fix` to perform an inplace fix.


Babylon.js             ← engine
Babylon.js Editor      ← scene/asset editor
TypeScript              ← language
Vite                    ← build
VS Code                 ← IDE
Blender                 ← 3D
LibreSprite             ← pixel art
Git                     ← version control
Git LFS                 ← large assets
Ollama                  ← local AI runtime
OpenCode                ← AI coding agent
Vitest                  ← tests
ESLint                  ← code quality
Prettier                ← formatting

my-babylon-game/
│
├── .github/
│   └── workflows/
│       └── build.yml
│
├── .vscode/
│   ├── extensions.json
│   └── settings.json
│
├── assets/
│   ├── characters/
│   │   ├── player/
│   │   └── enemies/
│   │
│   ├── weapons/
│   ├── environments/
│   ├── textures/
│   ├── sprites/
│   ├── animations/
│   ├── particles/
│   ├── audio/
│   └── ui/
│
├── scenes/
│   ├── main/
│   │   └── main.scene
│   ├── test/
│   │   └── combat.scene
│   └── levels/
│
├── src/
│   ├── core/
│   │   ├── Game.ts
│   │   ├── GameState.ts
│   │   └── Events.ts
│   │
│   ├── entities/
│   │   ├── Entity.ts
│   │   ├── Player.ts
│   │   ├── Enemy.ts
│   │   ├── Projectile.ts
│   │   └── Pickup.ts
│   │
│   ├── combat/
│   │   ├── CombatSystem.ts
│   │   ├── DamageSystem.ts
│   │   ├── WeaponSystem.ts
│   │   └── HitDetection.ts
│   │
│   ├── physics/
│   │   ├── PhysicsWorld.ts
│   │   └── CollisionLayers.ts
│   │
│   ├── ai/
│   │   ├── AIController.ts
│   │   ├── StateMachine.ts
│   │   └── behaviors/
│   │
│   ├── animation/
│   │   └── AnimationController.ts
│   │
│   ├── assets/
│   │   ├── AssetManager.ts
│   │   └── AssetRegistry.ts
│   │
│   ├── rpg/
│   │   ├── Stats.ts
│   │   ├── Inventory.ts
│   │   ├── Equipment.ts
│   │   └── Loot.ts
│   │
│   ├── ui/
│   │
│   └── main.ts
│
├── data/
│   ├── weapons/
│   ├── enemies/
│   ├── items/
│   └── levels/
│
├── tools/
│
├── tests/
│
├── AGENTS.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
├── .gitignore
└── README.md


scenes/   → Babylon Editor
assets/   → art/content
data/     → game configuration
src/      → TypeScript/game logic


There's also a lightweight community template specifically using Babylon.js + TypeScript + Vite + ESLint + Prettier, which is much closer to what you want than the older Webpack templates:

babylonjs-typescript-starter

It uses Vite and TypeScript and has the basic Babylon scene already wired up. 
G
GitHub

I'd use that as the code foundation, then add the Babylon Editor/scenes and the project structure above.

There is also a more substantial Babylon.js 9/Vite/TypeScript template with Havok, GLB loading and Babylon GUI:

BabylonPress Babylon.js template

It includes a vanilla TypeScript template as well as React/Vue/Svelte variants. 
G
GitHub

For your game, though, I'd keep it vanilla TypeScript rather than adding React.

Asset management
I'd take advantage of Babylon's asset system rather than inventing something huge.

For example:

assets/
└── characters/
    └── skeleton/
        ├── skeleton.glb
        ├── skeleton.blend
        └── textures/
            ├── body.png
            └── eyes.png

Then your TypeScript asset registry:

export const Assets = {
    characters: {
        player: "/assets/characters/player/player.glb",
        skeleton: "/assets/characters/skeleton/skeleton.glb",
    },

    weapons: {
        pistol: "/assets/weapons/pistol/pistol.glb",
        shotgun: "/assets/weapons/shotgun/shotgun.glb",
    },
} as const;

Use Babylon's AssetContainer for reusable characters/enemies/weapons rather than loading the same GLB repeatedly. Babylon's documentation specifically supports this workflow. 
G
GitHub

AI-ready from day one
I'd make AGENTS.md one of the first files in the repo.

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

That gives your local AI agent a persistent project specification.

GitHub Actions
I'd also immediately add:

name: Build

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npm run typecheck
      - run: npm run build

Now every AI-generated change gets checked automatically.

One more useful Babylon repo
For assets specifically, Babylon maintains an official asset-host template:

BabylonJS Asset Host Template

It is designed to keep assets separate from application code and can serve assets from a GitHub Pages site. 
G
GitHub

I wouldn't necessarily split your game into two repositories initially. But if your asset library gets huge, that's a good second-stage architecture:

game/
   ↓
GitHub repo

game-assets/
   ↓
GitHub asset repo / Pages

game → loads → assets

My final choice
For your game, I'd start with:

Base:

BabylonJS TypeScript + Vite starter

Editor:

Official Babylon.js Editor

3D assets: Blender → GLB

2D assets: LibreSprite → PNG

Game code: strict TypeScript

AI: OpenCode + Ollama

Versioning: Git + GitHub

Scenes: Babylon Editor

CI: GitHub Actions

That gives you a clean, AI-friendly, completely free foundation without tying your game to some abandoned boilerplate. The official Editor is actively maintained and currently has built-in project templates, while the TypeScript/Vite starter gives you the simpler application-side foundation. 
G
GitHub
+1
