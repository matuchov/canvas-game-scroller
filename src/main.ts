import { Game } from './core/Game';

const canvas = document.querySelector('canvas');

export const game = new Game(canvas!);
game.render();
