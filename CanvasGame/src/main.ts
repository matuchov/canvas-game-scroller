import { checkCircleCollision } from './Colision';
import { controls } from './Controls';
import { Enemy } from './Enemy';
import { Object } from './Object';
import { Player } from './Player';

const canvas = document.querySelector('canvas');

const ctx = canvas?.getContext('2d');

canvas!.width = 700;
canvas!.height = 900;

ctx!.fillStyle = '#969696';
ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

const enemies: Object[] = [];
export const lasers: Object[] = [];

const player = new Player({ x: 100, y: 200 }, ctx!, controls);
const enemy1 = new Enemy({ x: 100, y: 200 }, ctx!);
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
