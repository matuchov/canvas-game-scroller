import { store, type cellType } from '../../store/store';

import { CONSTS } from '../const';
import { BaseElement, type IBaseElement } from '../Object';
import { BoardController } from './BoardController';

const { DIVIDER_W, CELL_SIZE } = CONSTS;

type TBoardType = 'player' | 'enemy';

interface BoardProps extends IBaseElement {
  boardType: TBoardType;
}

export class Board extends BaseElement {
  private board: cellType[][];
  private controller = new BoardController(this);
  boardType: TBoardType;

  constructor({ position, ctx, size, boardType }: BoardProps) {
    super({ position, ctx, size });
    this.position = position;
    this.board = this.getBoard();
    this.boardType = boardType;
    this.size = this.calculateSize();
    this.controller.init();
  }

  getBoard() {
    return this.boardType === 'player'
      ? store.getStore().playerBoard
      : store.getStore().enemyBoard;
  }

  calculateSize() {
    return {
      x: (CELL_SIZE.x + DIVIDER_W) * this.board.length,
      y: (CELL_SIZE.y + DIVIDER_W) * this.board.length,
    };
  }

  renderBoard() {
    this.board = this.getBoard();
    this.board.forEach((el, row) => {
      el.forEach((cell, column) => {
        switch (cell) {
          case 'empty':
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            break;
          case 'hited':
            this.ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
            break;
          case 'ship':
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            break;
          case 'miss':
            this.ctx.fillStyle = 'rgba(0, 255, 4, 0.08)';
            break;
          default:
            break;
        }

        this.ctx.fillRect(
          this.position.x + (DIVIDER_W + CELL_SIZE.x) * column,
          this.position.y + (DIVIDER_W + CELL_SIZE.y) * row,
          CELL_SIZE.x,
          CELL_SIZE.y,
        );
      });
    });
  }

  draw(): void {
    this.renderBoard();
  }
}
