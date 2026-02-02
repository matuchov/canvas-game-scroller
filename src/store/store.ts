import { createEnemyShips } from '../utils/createEnemyShips';

export type GamePhase = 'SETUP' | 'BATTLE' | 'RESULT';
export type cellType = 'empty' | 'ship' | 'miss' | 'hited';

export interface GameStore {
  phase: GamePhase;
  playerBoard: cellType[][]; // 0: пусто, 1: корабль, 2: промах, 3: попадание
  enemyBoard: cellType[][];
  selectedShipId: string | null;
  currentTurn: 'PLAYER' | 'ENEMY';
}

const shipsToPlace = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

class Store {
  private store: GameStore = {
    phase: 'SETUP',
    playerBoard: Array(10)
      .fill(0)
      .map(() => Array(10).fill('empty')),
    enemyBoard: createEnemyShips(shipsToPlace),
    selectedShipId: null,
    currentTurn: 'PLAYER',
  };
  getStore() {
    return this.store;
  }
  setStore(data: Partial<GameStore>) {
    Object.assign(this.store, data);
  }
}

export const store = new Store();
