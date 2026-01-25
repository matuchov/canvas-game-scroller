import { Laser } from './Laser';
import { Object, type ObjectProps } from './Object';
import type { controls } from '../utils/Controls';
<<<<<<< HEAD
import { game } from '../main';
=======
>>>>>>> dev

interface PlayerProps extends ObjectProps {
  control: typeof controls;
}

export class Player extends Object {
<<<<<<< HEAD
  controls: typeof controls;
=======
  private controls: typeof controls;
  lasers: Laser[] = [];
  private shotTimer = 0;
  private shotDelay = 40;

>>>>>>> dev
  constructor({ position, ctx, control, size, imageSrc }: PlayerProps) {
    super({ position, ctx, size, imageSrc });
    this.controls = control;
  }

<<<<<<< HEAD
  fire() {
    game.lasers.push(
=======
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
>>>>>>> dev
      new Laser({
        position: { x: this.position.x, y: this.position.y },
        ctx: this.ctx,
        size: { x: 5, y: 20 },
        speed: -10,
      }),
    );
<<<<<<< HEAD
=======
    this.lasers = this.lasers.filter((laser) => laser.position.y > 0);
>>>>>>> dev
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

<<<<<<< HEAD
    if (this.controls.space) {
      this.fire();
    }
=======
    this.handleShooting();
    this.lasers.forEach((el) => el.render());
>>>>>>> dev
  }
}
