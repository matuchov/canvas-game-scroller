import { Object, type coordsType } from './Object';

export class Laser extends Object {
  private speed: number = 1;

  constructor(
    position: coordsType,
    ctx: CanvasRenderingContext2D,
    size?: coordsType,
    speed?: number,
  ) {
    super(position, ctx, size);
    this.size = { x: 10, y: 40 };
    if (speed) this.speed = speed;
  }

  move(): void {
    this.position.y += this.speed;
  }
}
