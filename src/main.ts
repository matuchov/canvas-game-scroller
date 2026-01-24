import { checkCircleCollision } from '../utils/Colision';
import { controls } from '../utils/Controls';
import { Enemy } from './components/Enemy';
import { Object } from './components/Object';
import { Player } from './components/Player';

const canvas = document.querySelector('canvas');

const ctx = canvas?.getContext('2d');

canvas!.width = 700;
canvas!.height = 900;

ctx!.fillStyle = '#969696';
ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

const enemies: Object[] = [];
export const lasers: Object[] = [];

const player = new Player({
  position: { x: 270, y: 750 },
  ctx: ctx!,
  control: controls,
  imageSrc: '/accets/player.png',
});
const enemy1 = new Enemy({
  position: { x: 100, y: 100 },
  ctx: ctx!,
  imageSrc: '/accets/enemy.png',
});
enemies.push(enemy1);

function animate() {
  window.requestAnimationFrame(animate);
  ctx!.fillStyle = '#969696';
  ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
  player.render();
  lasers.forEach((el) => {
    el.render();
    if (checkCircleCollision(enemy1, el)) console.log('collision');
  });
  enemies.forEach((el) => el.render());
  if (checkCircleCollision(player, enemy1)) console.log('collision');
}

animate();
