import { Background } from "../components/Background";

import { Score } from "./Score";
import { Board } from "./Board/Board";

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private backgrounds: Background[] = [];
  private score: number = 0;
  private scores: Score;
  private board: Board;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.canvas.width = 700;
    this.canvas.height = 700;
    this.board = new Board({
      position: { x: 70, y: 70 },
      ctx: this.ctx,
      type: "player",
    });

    this.initBackgrounds();
  }

  private initBackgrounds() {
    this.backgrounds = [
      new Background({
        ctx: this.ctx,
        position: { x: 0, y: 0 },
        size: { x: 900, y: 900 },
        speed: 0,
        color: "royalblue",
      }),
    ];
  }

  public render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.backgrounds.forEach((bg) => bg.render());
    this.board.render();
    requestAnimationFrame(() => this.render());
  }
}
