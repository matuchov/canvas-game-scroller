import { Background } from '../components/Background';

import { Messages } from '../components/Messages';
import { Board } from '../components/Board';
import { GameController } from './GameController';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private backgrounds: Background[] = [];
  private messages: Messages;
  private playerBoard: Board;
  private enemyBoard: Board;
  private fps = 30;
  private interval = 1000 / this.fps;
  private lastTime = 0;
  private gameController: GameController;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.canvas.width = 300;
    this.canvas.height = 600;
    this.messages = new Messages({
      ctx: this.ctx,
      position: {
        x: 20,
        y: 20,
      },
    });
    this.playerBoard = new Board({
      position: { x: 40, y: 50 },
      ctx: this.ctx,
      boardType: 'player',
    });
    this.enemyBoard = new Board({
      position: { x: 40, y: 320 },
      ctx: this.ctx,
      boardType: 'enemy',
    });

    this.initBackgrounds();
    this.gameController = new GameController(this.playerBoard, this.enemyBoard);
    this.gameController.init();
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

  public render(currentTime: number = 0) {
    requestAnimationFrame((time) => this.render(time));

    const deltaTime = currentTime - this.lastTime;

    if (deltaTime > this.interval) {
      this.lastTime = currentTime - (deltaTime % this.interval);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.backgrounds.forEach((bg) => bg.render());
      this.messages.render();
      this.playerBoard.render();
      this.enemyBoard.render();
    }
  }
}
