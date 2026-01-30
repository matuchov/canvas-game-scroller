import { controls } from './../utils/Controls';
import { Player } from '../components/Player';
import { Background } from '../components/Background';
import { Enemy } from '../components/Enemy';
import { checkCollision } from '../utils/Colision';
import { getRandomInt } from '../utils/Math';
import { Score } from './Score';
import { Board } from './Board';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private enemies: Enemy[] = [];
  private backgrounds: Background[] = [];
  private controls: typeof controls;
  private score: number = 0;
  private scores: Score;
  private board: Board;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.canvas.width = 700;
    this.canvas.height = 700;
    this.controls = controls;
    this.board = new Board({ position: { x: 70, y: 70 }, ctx: this.ctx });

    this.initBackgrounds();
  }

  private initBackgrounds() {
    this.backgrounds = [
      new Background({
        ctx: this.ctx,
        position: { x: 0, y: 0 },
        size: { x: 900, y: 900 },
        speed: 0,
        color: 'royalblue',
      }),
    ];
  }

  private spawnEnemies() {}

  private handleCollisions() {}

  public render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.backgrounds.forEach((bg) => bg.render());
    this.board.render();
    requestAnimationFrame(() => this.render());
  }
}
