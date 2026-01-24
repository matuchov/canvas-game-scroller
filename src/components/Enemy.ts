import { Object, type coordsType, type ObjectProps } from './Object';

interface EnemyProps extends ObjectProps {}

export class Enemy extends Object {
  private angle: number = 0;
  private speed: number = 1;
  private amplitude: number = 2;

  constructor(props: EnemyProps) {
    super(props);
  }

  fire() {}

  move(): void {
    if (
      this.position.x - this.start.x > 100 ||
      this.position.x - this.start.x < 0
    ) {
      this.speed = -this.speed;
    }

    this.position.x += this.speed;
    this.angle += 0.05;

    this.position.y += Math.sin(this.angle) * this.amplitude;
  }
}
