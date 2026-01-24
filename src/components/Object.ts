export type coordsType = {
  x: number;
  y: number;
};

export type ObjectProps = {
  position: coordsType;
  ctx: CanvasRenderingContext2D;
  size?: coordsType;
  imageSrc?: string;
};

export class Object {
  position: coordsType;
  ctx: CanvasRenderingContext2D;
  size: coordsType;
  canvaseSize: coordsType;
  start: coordsType;
  image: HTMLImageElement;
  constructor({ position, ctx, size, imageSrc }: ObjectProps) {
    this.position = position;
    this.ctx = ctx;
    this.size = size || { x: 40, y: 40 };
    this.canvaseSize = { x: this.ctx.lineWidth, y: this.ctx.lineDashOffset };
    this.start = { x: position.x, y: position.y };
    this.image = new Image();
    this.image.src = imageSrc || '/accets/Placeholder.png';
  }

  draw() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y);
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
