import { Object, type ObjectProps } from './Object';

interface LaserProps extends ObjectProps {
  speed?: number;
}

export class Laser extends Object {
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
