import { BaseElement, type ObjectProps } from './Object';

interface CellProps extends ObjectProps {
  cellSize: number;
}

export class Cell extends BaseElement {
  private cellSize = 10;

  constructor({ position, ctx, size }: CellProps) {
    const imageSrc = '/assets/laser.png';
    super({ position, ctx, size, imageSrc });
    this.size = { x: 10, y: 40 };
  }

  move(): void {}
}
