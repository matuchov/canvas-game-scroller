import { Object, type ObjectProps } from './Object';

interface BackgroundProps extends ObjectProps {
  background1src: string;
  background2src: string;
}

export class Background extends Object {
  private speed: number = 1;
  private amplitude: number = 2;
  private background1: HTMLImageElement;
  private background2: HTMLImageElement;

  constructor(props: BackgroundProps) {
    const { background1src, background2src } = props;
    super(props);
    this.background1 = new Image();
    this.background1.src = background1src;

    this.background2 = new Image();
    this.background2.src = background2src;
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
