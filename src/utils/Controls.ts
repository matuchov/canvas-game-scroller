import { EventBus } from './EventBus';

export const EVENTS = {
  CELL_CLICK: 'click',
} as const;

type TEventBus = {
  [EVENTS.CELL_CLICK]: [{ x: number; y: number }];
};

class Controls extends EventBus<TEventBus> {
  constructor() {
    super();
    document.addEventListener('mousedown', (e) => {
      const x = Math.floor(e.offsetX);
      const y = Math.floor(e.offsetY);
      this.emit('click', { x, y });
    });
  }
}

export const controlsController = new Controls();
