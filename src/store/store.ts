export interface GameStore {
  phase: 'PLACEMENT' | 'BATTLE' | 'GAMEOVER';
  playerBoard: number[][]; // 0: пусто, 1: корабль, 2: промах, 3: попадание
  enemyBoard: number[][];
  shipsToPlace: number[]; // [4, 3, 3, 2, 2, 2, 1, 1, 1, 1] — длины кораблей
  selectedShipId: string | null;
  currentTurn: 'PLAYER' | 'ENEMY';
}

class Store {
  private store: GameStore = {
    phase: 'PLACEMENT',
    playerBoard: Array(10)
      .fill(0)
      .map(() => Array(10).fill(0)),
    enemyBoard: Array(10)
      .fill(0)
      .map(() => Array(10).fill(0)),
    shipsToPlace: [4, 3, 3, 2, 2, 2, 1, 1, 1, 1],
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
