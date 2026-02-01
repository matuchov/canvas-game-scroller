import { store } from "../../store/store";

import { CONSTS } from "../const";
import { BaseElement, type IBaseElement } from "../Object";
import { BoardController } from "./BoardController";

const { DIVIDER_W, PLAYER_BOARD_POSITION, CELL_SIZE } = CONSTS;

interface BoardProps extends IBaseElement {
  type: "player" | "enemy";
}

export class Board extends BaseElement {
  private board: number[][];
  private controller = new BoardController(this);

  constructor({ position, ctx, size }: BoardProps) {
    super({ position, ctx, size });
    this.position = { x: PLAYER_BOARD_POSITION.x, y: PLAYER_BOARD_POSITION.y };
    this.board = store.getStore().playerBoard;
    this.size = this.calculateSize();
    this.controller.init();
  }

  calculateSize() {
    return {
      x: (CELL_SIZE.x + DIVIDER_W) * this.board.length,
      y: (CELL_SIZE.y + DIVIDER_W) * this.board.length,
    };
  }

  createBoard() {
    this.board.forEach((el, row) => {
      el.forEach((_, column) => {
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        this.ctx.fillRect(
          PLAYER_BOARD_POSITION.x + (DIVIDER_W + CELL_SIZE.x) * (column + 1),
          PLAYER_BOARD_POSITION.y + (DIVIDER_W + CELL_SIZE.y) * (row + 1),
          CELL_SIZE.x,
          CELL_SIZE.y,
        );
      });
    });
  }

  draw(): void {
    this.createBoard();
  }
}
