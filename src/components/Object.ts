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
  constructor({ position, ctx, imageSrc }: ObjectProps) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc || '/assets/Placeholder.png';
    this.ctx = ctx;
    this.size = { x: 0, y: 0 };
    this.image.onload = () => {
      this.size = { x: this.image.width, y: this.image.height };
    };

    this.canvaseSize = { x: this.ctx.lineWidth, y: this.ctx.lineDashOffset };
    this.start = { x: position.x, y: position.y };
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
