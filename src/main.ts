import { Game } from './core/Game';
import { GAME_CONFIG } from './GameConfig';

const canvas = document.querySelector('canvas');

export const game = new Game(canvas!, GAME_CONFIG);
game.render();
