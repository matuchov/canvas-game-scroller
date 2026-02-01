import { store } from "../../store/store";
import { checkClick } from "../../utils/Colision";
import { controlsController } from "../../utils/Controls";
import { CONSTS } from "../const";
import type { coordsType } from "../Object";
import type { Board } from "./Board";

export class BoardController {
  store: typeof store;
  board: Board;
  constructor(board: Board) {
    this.store = store;
    this.board = board;
  }
  init() {
    controlsController.on("click", this.clickHandler.bind(this));
  }

  clickHandler({ x, y }: coordsType) {
    console.log({ x, y });
    if (checkClick({ x, y }, this.board)) {
      const { x: offcetX, y: offcetY } = this.board.position;
      const { x: cellSizeX, y: cellSizeY } = CONSTS.CELL_SIZE;
      console.log(x - offcetX);

      const cellX = Math.floor((x - offcetX) / cellSizeX + CONSTS.DIVIDER_W);
      const cellY = Math.floor((y - offcetY) / cellSizeY + CONSTS.DIVIDER_W);
      switch (store.getStore().phase) {
        case "BATTLE":
          break;
        case "RESULT":
          break;
        case "SETUP":
          // console.log(cellX, cellY);
          break;
        default:
          break;
      }
    }
  }
}
