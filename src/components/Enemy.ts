<<<<<<< HEAD
=======
import { getRandomInt } from '../utils/Math';
import { Laser } from './Laser';
>>>>>>> dev
import { Object, type ObjectProps } from './Object';

interface EnemyProps extends ObjectProps {}

export class Enemy extends Object {
  private angle: number = 0;
  private speed: number = 1;
<<<<<<< HEAD
  private amplitude: number = 2;
=======
  private amplitude: number = getRandomInt(1, 4);
  private shotTimer = getRandomInt(100, 400);
  private shotDelay = 250;
  lasers: Laser[] = [];
>>>>>>> dev

  constructor(props: EnemyProps) {
    super(props);
  }

<<<<<<< HEAD
  fire() {}
=======
  private handleShooting() {
    if (this.shotTimer > 0) {
      this.shotTimer--;
    }

    if (this.shotTimer <= 0) {
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
        speed: 5,
      }),
    );
    this.lasers = this.lasers.filter((laser) => laser.position.y > 0);
  }
>>>>>>> dev

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
<<<<<<< HEAD
=======

    this.handleShooting();
    this.lasers.forEach((el) => el.render());
>>>>>>> dev
  }
}
