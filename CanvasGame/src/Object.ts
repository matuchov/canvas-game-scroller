export type coordsType = {
  x: number;
  y: number;
};

export class Object {
  position: coordsType;
  ctx: CanvasRenderingContext2D;
  size: coordsType;
  canvaseSize: coordsType;
  start: coordsType;
  constructor(
    position: coordsType,
    ctx: CanvasRenderingContext2D,
    size?: coordsType,
  ) {
    this.position = position;
    this.ctx = ctx;
    this.size = size || { x: 40, y: 40 };
    this.canvaseSize = { x: this.ctx.lineWidth, y: this.ctx.lineDashOffset };
    this.start = { x: position.x, y: position.y };
  }

  draw() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y,
    );
  }
  private _move() {
    this.move();
  }

  move() {}

  render() {
    this._move();
    this.draw();
  }
}
