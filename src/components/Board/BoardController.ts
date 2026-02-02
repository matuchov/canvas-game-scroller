import { store } from '../../store/store';
import { checkClick } from '../../utils/Colision';
import { controlsController } from '../../utils/Controls';
import { CONSTS } from '../const';
import type { coordsType } from '../Object';
import type { Board } from './Board';

export class BoardController {
  store: typeof store;
  board: Board;

  constructor(board: Board) {
    this.store = store;
    this.board = board;
  }
  init() {
    controlsController.on('click', this.clickHandler.bind(this));
  }

  clickHandler({ x, y }: coordsType) {
    if (checkClick({ x, y }, this.board)) {
      const { x: offcetX, y: offcetY } = this.board.position;
      const { x: cellSizeX, y: cellSizeY } = CONSTS.CELL_SIZE;
      const boarType = this.board.boardType;

      const cellX = Math.floor((x - offcetX) / (cellSizeX + CONSTS.DIVIDER_W));
      const cellY = Math.floor((y - offcetY) / (cellSizeY + CONSTS.DIVIDER_W));

      switch (boarType) {
        case 'enemy':
          this.enemyBoardHandler({ x: cellX, y: cellY });
          break;
        case 'player':
          this.playerBoardHandler({ x: cellX, y: cellY });
          break;
        default:
          break;
      }
    }
  }
  playerBoardHandler(cellCoords: coordsType) {
    const { x, y } = cellCoords;
    switch (store.getStore().phase) {
      case 'BATTLE':
        break;
      case 'RESULT':
        break;
      case 'SETUP':
        console.log(x, y);
        break;
      default:
        break;
    }
  }

  enemyBoardHandler(cellCoords: coordsType) {
    const { x, y } = cellCoords;
    const enemyBoard = [...store.getStore().enemyBoard];
    const cellState = enemyBoard[y][x];

    if (cellState === 'ship') {
      enemyBoard[y][x] = 'hited';
      this.store.setStore({ enemyBoard });
    } else if (cellState === 'empty') {
      enemyBoard[y][x] = 'miss';

      this.store.setStore({ enemyBoard });
      this.store.setStore({ currentTurn: 'ENEMY' });
    }
  }
}
