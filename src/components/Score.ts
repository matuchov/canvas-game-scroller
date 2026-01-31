import { BaseElement, type IBaseElement } from './Object';

interface ScoreProps extends IBaseElement {
  score: number;
}

export class Score extends BaseElement {
  score: number;
  constructor(props: ScoreProps) {
    const position = { x: 450, y: 30 };
    super({ ...props, position });
    this.score = props.score;
  }

  setScore(score: number) {
    this.score = score;
    this.render();
  }

  render(): void {
    const { x, y } = this.position;
    this.ctx.fillStyle = 'white';
    this.ctx.font = '30px consolas';
    this.ctx.fillText(`score: ${this.score}`, x, y);
  }
}
