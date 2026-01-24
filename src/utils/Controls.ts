export const controls = {
  left: false,
  right: false,
  up: false,
  down: false,
  space: false,
};

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
