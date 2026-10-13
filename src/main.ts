import './style.css';
import { Game } from './core/Game';

const canvas = document.createElement('canvas');
const game = new Game(canvas);

async function bootstrap(): Promise<void> {
  await game.initialize();
  game.start();
}

bootstrap().catch(console.error);