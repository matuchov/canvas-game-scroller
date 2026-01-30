import { BaseElement, type ObjectProps } from './Object';

interface BackgroundProps extends ObjectProps {
  speed: number;
}

export class Background extends BaseElement {
  speed: number;
  constructor(props: BackgroundProps) {
    super(props);
    this.speed = props.speed;
    
  }

  // draw(): void {
  //   if (this.position.y > 0) {
  //     this.position.y = this.start.y;
  //   }

  //   this.position.y += this.speed;
  // }
}
