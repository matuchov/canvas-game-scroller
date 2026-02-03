import type { Board } from '../components/Board';
import { CONSTS } from '../components/const';
import type { coordsType } from '../components/Object';
import { checkClick } from '../utils/checkClick';
import { getRandomInt } from '../utils/Math';
import { validatePlacement } from '../utils/ValidateShip';
import { store, type GameStore } from './Store';

export class GameController {
  store: typeof store;
  playerBoard: Board;
  enemyBoard: Board;

  constructor(playerBoard: Board, enemyBoard: Board) {
    this.store = store;
    this.playerBoard = playerBoard;
    this.enemyBoard = enemyBoard;
  }
  init() {
    document.addEventListener('mousedown', (e) => {
      const x = Math.floor(e.offsetX);
      const y = Math.floor(e.offsetY);
      this.clickHandler({ x, y });
    });
    store.on('update', this.enemyHandler.bind(this));
  }

  enemyHandler(state?: GameStore) {
    state = state ? state : store.getStore();
    const { phase, currentTurn } = state;

    if (phase === 'BATTLE' && currentTurn === 'ENEMY') {
      const x = getRandomInt(0, 9);
      const y = getRandomInt(0, 9);
      this.fireShot({ x, y }, 'enemy');
    }
  }

  clickHandler({ x, y }: coordsType) {
    const { currentTurn, phase } = store.getStore();
    console.log('dsadsa');
    if (
      checkClick({ x, y }, this.enemyBoard) &&
      currentTurn === 'PLAYER' &&
      phase === 'BATTLE'
    ) {
      this.fireShot(this.coordsToCell({ x, y }, this.enemyBoard), 'player');
    }

    if (checkClick({ x, y }, this.playerBoard) && phase === 'SETUP') {
      this.placeShip(this.coordsToCell({ x, y }, this.playerBoard));
    }
  }

  coordsToCell({ x, y }: coordsType, board: Board) {
    const { x: offcetX, y: offcetY } = board.position;
    const { x: cellSizeX, y: cellSizeY } = CONSTS.CELL_SIZE;

    const cellX = Math.floor((x - offcetX) / (cellSizeX + CONSTS.DIVIDER_W));
    const cellY = Math.floor((y - offcetY) / (cellSizeY + CONSTS.DIVIDER_W));
    return { x: cellX, y: cellY };
  }

  fireShot(cellCoords: coordsType, shooter: 'player' | 'enemy') {
    const { x, y } = cellCoords;
    const board =
      shooter === 'player'
        ? [...store.getStore().enemyBoard]
        : [...store.getStore().playerBoard];
    const cellState = board[y][x];

    if (cellState === 'ship') {
      board[y][x] = 'hited';
      this.store.setStore(
        shooter === 'player' ? { enemyBoard: board } : { playerBoard: board },
      );
    } else if (cellState === 'empty') {
      board[y][x] = 'miss';

      this.store.setStore(
        shooter === 'player'
          ? { enemyBoard: board, currentTurn: 'ENEMY' }
          : { playerBoard: board, currentTurn: 'PLAYER' },
      );
    } else if (shooter === 'enemy') {
      this.enemyHandler();
    }
  }

  placeShip(cellCoords: coordsType) {
    const { x, y } = cellCoords;

    const { shipsToPlace, playerBoard } = store.getStore();
    const currentShip = shipsToPlace[0];

    if (validatePlacement(playerBoard, x, y, currentShip, 'row')) {
      const newBoard = [...playerBoard];
      const shipCoord = Array(currentShip)
        .fill(0)
        .map((_, i) => {
          return { x: x + i, y: y };
        });
      shipCoord.forEach(({ x, y }) => {
        newBoard[y][x] = 'ship';
      });
      const newShipsToPlace = [...shipsToPlace.slice(1, shipsToPlace.length)];
      store.setStore({
        playerBoard: newBoard,
        shipsToPlace: newShipsToPlace,
        message: `Поставьте корабль длинной ${newShipsToPlace[0]} на поле`,
      });

      if (newShipsToPlace.length === 0) {
        store.setStore({ phase: 'BATTLE', message: 'Ваш ход' });
      }
    }
  }
}
