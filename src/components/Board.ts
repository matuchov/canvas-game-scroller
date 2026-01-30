import { store } from '../store/store';
import { controlsController } from '../utils/Controls';
import { CONSTS } from './const';
import { BaseElement, type ObjectProps } from './Object';

const { DIVIDER_W, BOARD_POSITION, CELL_SIZE } = CONSTS;

interface BoardProps extends ObjectProps {}

export class Board extends BaseElement {
  private board: number[][];
  private cells: BaseElement[] = [];
  private dividers: BaseElement[] = [];

  constructor({ position, ctx, size }: BoardProps) {
    super({ position, ctx, size });
    this.board = store.getStore().playerBoard;
    this.size = { x: 10, y: 10 };
    this.createBoard();
    this.clickHandlerInit();
  }

  createBoard() {
    this.board.forEach((el, row) => {
      el.forEach((el, column) => {
        this.cells.push(
          new BaseElement({
            position: {
              x: BOARD_POSITION.x + (DIVIDER_W + CELL_SIZE.x) * (column + 1),
              y: BOARD_POSITION.y + (DIVIDER_W + CELL_SIZE.y) * (row + 1),
            },
            ctx: this.ctx,
            color: 'rgba(255, 255, 255, 0.5)',
            size: {
              x: CELL_SIZE.x,
              y: CELL_SIZE.y,
            },
          }),
        );
      });
    });
  }

  clickHandlerInit() {
    controlsController.on('init', ({ x, y }) => {
      console.log(x, y);
    });
  }

  draw(): void {
    this.cells.forEach((cell) => {
      cell.render();
    });
  }
}
