import { controls } from './Controls';
import { Laser } from './Laser';
import { lasers } from './main';
import { Object, type coordsType } from './Object';

export class Player extends Object {
  controls: typeof controls;
  constructor(
    position: coordsType,
    ctx: CanvasRenderingContext2D,
    control: typeof controls,
    size?: coordsType,
  ) {
    super(position, ctx, size);
    this.controls = control;
  }

  fire() {
    lasers.push(
      new Laser(
        { x: this.position.x, y: this.position.y },
        this.ctx,
        { x: 5, y: 20 },
        -10,
      ),
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
