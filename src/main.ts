import './style.css';
import { Game } from './core/Game';

const canvas = document.createElement('canvas');
let game: Game;

async function bootstrap(): Promise<void> {
  game = new Game(canvas);
  // Wait for scene constructors to load
  await new Promise(resolve => setTimeout(resolve, 0));
  await game.initialize();
  game.start();
}

bootstrap().catch(console.error);

if (import.meta.hot) {
  import.meta.hot.accept('./core/Game', async () => {
    await game.hotReload();
  });
  import.meta.hot.accept('./scenes/main/MainScene', async () => {
    await game.updateSceneConstructors();
    await game.hotReload();
  });
  import.meta.hot.accept('./scenes/asset-manager/AssetManagerScene', async () => {
    await game.updateSceneConstructors();
    await game.hotReload();
  });
  import.meta.hot.dispose(() => {
    game?.dispose();
  });
}