import { store, type GameStore } from '../../core/store';
import { checkClick } from '../../utils/Colision';
import { controlsController } from '../../utils/Controls';
import { getRandomInt } from '../../utils/Math';
import { validatePlacement } from '../../utils/ValidateShip';
import { CONSTS } from '../const';
import type { coordsType } from '../Object';
import type { Board } from './Board';

export class GameController {
  store: typeof store;
  board: Board;

  constructor(board: Board) {
    this.store = store;
    this.board = board;
  }
  init() {
    controlsController.on('click', this.clickHandler.bind(this));
    store.on('update', this.enemyHandler.bind(this));
  }

  enemyHandler(_: GameStore, newState: GameStore) {
    const { phase, currentTurn } = newState;
    console.log(phase, currentTurn);
    if (phase === 'BATTLE' && currentTurn === 'ENEMY') {
      const x = getRandomInt(0, 9);
      const y = getRandomInt(0, 9);
      setTimeout(() => {
        this.fireShot({ x, y }, 'enemy');
      }, 500);
    }
  }

  clickHandler({ x, y }: coordsType) {
    if (checkClick({ x, y }, this.board)) {
      const { x: offcetX, y: offcetY } = this.board.position;
      const { x: cellSizeX, y: cellSizeY } = CONSTS.CELL_SIZE;
      const { currentTurn, phase } = store.getStore();
      const boardType = this.board.boardType;

      const cellX = Math.floor((x - offcetX) / (cellSizeX + CONSTS.DIVIDER_W));
      const cellY = Math.floor((y - offcetY) / (cellSizeY + CONSTS.DIVIDER_W));

      if (
        boardType === 'enemy' &&
        currentTurn === 'PLAYER' &&
        phase === 'BATTLE'
      ) {
        this.fireShot({ x: cellX, y: cellY }, 'player');
      }
      if (boardType === 'player' && phase === 'SETUP') {
        this.placeShip({ x: cellX, y: cellY });
      }
    }
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
