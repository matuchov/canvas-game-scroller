import { BaseElement, type IBaseElement } from './Object';

interface LaserProps extends IBaseElement {
  speed?: number;
}

export class Laser extends BaseElement {
  private speed: number = 1;

  constructor({ position, ctx, size, speed }: LaserProps) {
    const imageSrc = '/assets/laser.png';
    super({ position, ctx, size, imageSrc });
    this.size = { x: 10, y: 40 };
    if (speed) this.speed = speed;
  }

  move(): void {
    this.position.y += this.speed;
  }
}
