import { controls } from './../utils/Controls';
import { Player } from '../components/Player';
import { Background } from '../components/Background';
import { Enemy } from '../components/Enemy';
import { checkCollision } from '../utils/Colision';
import { getRandomInt } from '../utils/Math';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private enemies: Enemy[] = [];
  private backgrounds: Background[] = [];
  private controls: typeof controls;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.canvas.width = 700;
    this.canvas.height = 700;
    this.controls = controls;
    this.player = new Player({
      position: { x: 270, y: 650 },
      ctx: this.ctx,
      control: this.controls,
      imageSrc: '/assets/player.png',
    });

    this.initBackgrounds();
  }

  private initBackgrounds() {
    const assets = [
      { src: '/assets/background.png', speed: 0 },
      { src: '/assets/background1.png', speed: 1 },
      { src: '/assets/background2.png', speed: 2 },
    ];
    this.backgrounds = assets.map(
      (asset) =>
        new Background({
          ctx: this.ctx,
          position: { x: 0, y: -1300 },
          speed: asset.speed,
          imageSrc: asset.src,
        }),
    );
  }

  private spawnEnemies() {
    if (this.enemies.length === 0) {
      for (let i = 0; i < 5; i++) {
        this.enemies.push(
          new Enemy({
            position: {
              x: 100 + 100 * i,
              y: 10 + getRandomInt(0, 50),
            },
            ctx: this.ctx,
            imageSrc: '/assets/enemy.png',
          }),
        );
      }
    }
  }

  private handleCollisions() {
    this.player.lasers.forEach((laser, lIdx) => {
      this.enemies.forEach((enemy, eIdx) => {
        if (checkCollision(enemy, laser)) {
          this.enemies.splice(eIdx, 1);
        }
      });
    });
  }

  public render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.backgrounds.forEach((bg) => bg.render());
    this.player.render();
    this.spawnEnemies();
    this.enemies.forEach((enemy) => enemy.render());
    this.handleCollisions();
    requestAnimationFrame(() => this.render());
  }
}
