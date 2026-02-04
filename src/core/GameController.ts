import type { Board } from '../components/Board';
import type { coordsType } from '../components/Object';
import { checkClick, coordsToCell } from '../utils/clickUtils';
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
  init = () => {
    document.addEventListener('mousedown', this.handleMouseDown);
  };

  private enemyHandler = () => {
    const { phase, currentTurn } = store.getStore();

    if (phase === 'BATTLE' && currentTurn === 'ENEMY') {
      const x = getRandomInt(0, 9);
      const y = getRandomInt(0, 9);
      this.fireShot({ x, y }, 'enemy');
    }
  };

  private handleMouseDown = (e: MouseEvent) => {
    const x = Math.floor(e.offsetX);
    const y = Math.floor(e.offsetY);
    const { currentTurn, phase } = store.getStore();
    const clikOnEnemyBoard = checkClick({ x, y }, this.enemyBoard);
    const clikOnPlayerBoard = checkClick({ x, y }, this.playerBoard);

    if (clikOnEnemyBoard && currentTurn === 'PLAYER' && phase === 'BATTLE') {
      this.fireShot(coordsToCell({ x, y }, this.enemyBoard), 'player');
    } else if (clikOnPlayerBoard && phase === 'SETUP') {
      this.placeShip(coordsToCell({ x, y }, this.playerBoard));
    }
  };

  private fireShot = (cellCoords: coordsType, shooter: 'player' | 'enemy') => {
    const { x, y } = cellCoords;
    const currentBoard =
      shooter === 'player'
        ? store.getStore().enemyBoard
        : store.getStore().playerBoard;
    const cellState = currentBoard[y][x];
    const board = currentBoard.map((row) => [...row]);

    if (cellState === 'ship') {
      board[y][x] = 'hited';
      this.store.setStore(
        shooter === 'player' ? { enemyBoard: board } : { playerBoard: board },
      );
      if (shooter === 'enemy') this.enemyHandler();
    } else if (cellState === 'empty') {
      board[y][x] = 'miss';

      this.store.setStore(
        shooter === 'player'
          ? { enemyBoard: board, currentTurn: 'ENEMY' }
          : { playerBoard: board, currentTurn: 'PLAYER' },
      );
      this.enemyHandler();
    } else if (shooter === 'enemy') {
      this.enemyHandler();
    }
  };

  private placeShip = (cellCoords: coordsType) => {
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
  };

  destroy = () => {
    document.removeEventListener('mousedown', this.handleMouseDown);
  };
}
