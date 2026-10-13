import './style.css';
import { Game } from './core/Game';

const canvas = document.createElement('canvas');
let game: Game;

async function bootstrap(): Promise<void> {
  game = new Game(canvas);
  await game.initialize();
  game.start();
}

bootstrap().catch(console.error);

if (import.meta.hot) {
  import.meta.hot.accept('./core/Game', async () => {
    await game.hotReload();
  });
  import.meta.hot.accept('./scenes/MainScene', async () => {
    await game.hotReload();
  });
  import.meta.hot.accept('./scenes/AssetManagerScene', async () => {
    await game.hotReload();
  });
  import.meta.hot.accept('./scenes/TestScene', async () => {
    await game.hotReload();
  });
  import.meta.hot.dispose(() => {
    game?.dispose();
  });
}