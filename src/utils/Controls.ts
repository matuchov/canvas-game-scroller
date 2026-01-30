import { EventBus } from './EventBus';

export const controls = {
  left: false,
  right: false,
  up: false,
  down: false,
  space: false,
};

const EVENTS = {
  CELL_CLICK: 'init',
} as const;

type TEventBus<T> = {
  [EVENTS.CELL_CLICK]: [{ x: number; y: number }];
};

class Controls extends EventBus<TEventBus<any>> {
  constructor() {
    super();
    document.addEventListener('mousedown', (e) => {
      const x = Math.floor(e.offsetX);
      const y = Math.floor(e.offsetY);
      this.emit('init', { x, y });
    });
  }
}

export const controlsController = new Controls();

document.addEventListener('keydown', (e) => {
  const key = e.code;

  switch (key) {
    case 'KeyD':
      controls.right = true;
      break;
    case 'KeyA':
      controls.left = true;
      break;
    case 'KeyW':
      controls.up = true;
      break;
    case 'KeyS':
      controls.down = true;
      break;
    case 'Space':
      controls.space = true;

      break;
  }
});

document.addEventListener('keyup', (e) => {
  e.preventDefault();
  const key = e.code;
  switch (key) {
    case 'KeyD':
      controls.right = false;
      break;
    case 'KeyA':
      controls.left = false;
      break;
    case 'KeyW':
      controls.up = false;
      break;
    case 'KeyS':
      controls.down = false;
      break;
    case 'Space':
      controls.space = false;

      break;
  }
});
