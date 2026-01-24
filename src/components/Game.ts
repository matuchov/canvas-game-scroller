import { Player } from '../components/Player';
import { Background } from '../components/Background';
import { Enemy } from '../components/Enemy';
import { controls } from '../utils/Controls';
import { checkCircleCollision } from '../utils/Colision';
import type { Laser } from './Laser';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private enemies: Enemy[] = [];
  lasers: Laser[] = [];
  private backgrounds: Background[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.canvas.width = 700;
    this.canvas.height = 900;

    this.player = new Player({
      position: { x: 270, y: 750 },
      ctx: this.ctx,
      control: controls,
      imageSrc: '/assets/player.png',
    });

    this.initBackgrounds();
  }

  private initBackgrounds() {
    const assets = [
      { src: '/assets/background.png', speed: 0 },
      { src: '/assets/background1.png', speed: 0.5 },
      { src: '/assets/background2.png', speed: 3 },
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
              y: 100 + Math.floor(Math.random() * 51) + 50,
            },
            ctx: this.ctx,
            imageSrc: '/assets/enemy.png',
          }),
        );
      }
    }
  }

  private handleCollisions() {
    this.lasers.forEach((laser) => {
      this.enemies.forEach((enemy, eIdx) => {
        if (checkCircleCollision(enemy, laser)) {
          this.enemies.splice(eIdx, 1);
        }
      });
    });
  }
  private clearLasers() {
    if (this.lasers.length > 500) {
      this.lasers = this.lasers.slice(0, 400);
    }
  }

  public render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.backgrounds.forEach((bg) => bg.render());
    this.player.render();
    this.spawnEnemies();
    this.lasers.forEach((el) => el.render());
    this.enemies.forEach((enemy) => enemy.render());
    this.handleCollisions();
    this.clearLasers();
    requestAnimationFrame(() => this.render());
  }
}
