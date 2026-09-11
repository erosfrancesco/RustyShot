import './style.css';
import { Game } from './core/Game';
import { GameUI } from './ui/main';

const canvas = document.createElement('canvas');
const game = new Game(canvas);

const ui = new GameUI(game);
ui.init();

async function bootstrap(): Promise<void> {
  await game.loadAssets();
  game.start();
}

bootstrap().catch(console.error);
