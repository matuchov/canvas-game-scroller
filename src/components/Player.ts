import { Laser } from './Laser';
import { Object, type coordsType, type ObjectProps } from './Object';
import type { controls } from '../utils/Controls';
import { game } from '../main';

interface PlayerProps extends ObjectProps {
  control: typeof controls;
}

export class Player extends Object {
  controls: typeof controls;
  constructor({ position, ctx, control, size, imageSrc }: PlayerProps) {
    super({ position, ctx, size, imageSrc });
    this.controls = control;
  }

  fire() {
    game.lasers.push(
      new Laser({
        position: { x: this.position.x, y: this.position.y },
        ctx: this.ctx,
        size: { x: 5, y: 20 },
        speed: -10,
      }),
    );
  }

  move(): void {
    if (this.controls.down) {
      this.position.y += 2;
    } else if (this.controls.up) {
      this.position.y -= 2;
    }
    if (this.controls.left) {
      this.position.x -= 2;
    } else if (this.controls.right) {
      this.position.x += 2;
    }

    if (this.controls.space) {
      this.fire();
    }
  }
}
