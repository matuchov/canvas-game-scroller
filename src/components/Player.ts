import { Laser } from './Laser';
import { BaseElement, type ObjectProps } from './Object';
import type { controls } from '../utils/Controls';

interface PlayerProps extends ObjectProps {
  control: typeof controls;
}

export class Player extends BaseElement {
  private controls: typeof controls;
  lasers: Laser[] = [];
  private shotTimer = 0;
  private shotDelay = 40;

  constructor({ position, ctx, control, size, imageSrc }: PlayerProps) {
    super({ position, ctx, size, imageSrc });
    this.controls = control;
  }

  private handleShooting() {
    if (this.shotTimer > 0) {
      this.shotTimer--;
    }

    if (this.controls.space && this.shotTimer <= 0) {
      this.fire();
      this.shotTimer = this.shotDelay;
    }
  }

  fire() {
    this.lasers.push(
      new Laser({
        position: { x: this.position.x, y: this.position.y },
        ctx: this.ctx,
        size: { x: 5, y: 20 },
        speed: -10,
      }),
    );
    this.lasers = this.lasers.filter((laser) => laser.position.y > 0);
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

    this.handleShooting();
    this.lasers.forEach((el) => el.render());
  }
}
