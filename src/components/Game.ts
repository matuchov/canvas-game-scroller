<<<<<<< HEAD
import { Player } from '../components/Player';
import { Background } from '../components/Background';
import { Enemy } from '../components/Enemy';
import { controls } from '../utils/Controls';
import { checkCircleCollision } from '../utils/Colision';
import type { Laser } from './Laser';
=======
import { controls } from './../utils/Controls';
import { Player } from '../components/Player';
import { Background } from '../components/Background';
import { Enemy } from '../components/Enemy';
import { checkCollision } from '../utils/Colision';
import { getRandomInt } from '../utils/Math';
import { Score } from './Score';
>>>>>>> dev

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private enemies: Enemy[] = [];
<<<<<<< HEAD
  lasers: Laser[] = [];
  private backgrounds: Background[] = [];
=======
  private backgrounds: Background[] = [];
  private controls: typeof controls;
  private score: number = 0;
  private scores: Score;
>>>>>>> dev

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.canvas.width = 700;
<<<<<<< HEAD
    this.canvas.height = 900;

    this.player = new Player({
      position: { x: 270, y: 750 },
      ctx: this.ctx,
      control: controls,
      imageSrc: '/assets/player.png',
    });
=======
    this.canvas.height = 700;
    this.controls = controls;
    this.player = new Player({
      position: { x: 270, y: 650 },
      ctx: this.ctx,
      control: this.controls,
      imageSrc: '/assets/player.png',
    });
    this.scores = new Score({
      score: this.score,
      position: { x: 270, y: 650 },
      ctx: this.ctx,
    });
>>>>>>> dev

    this.initBackgrounds();
  }

  private initBackgrounds() {
    const assets = [
      { src: '/assets/background.png', speed: 0 },
<<<<<<< HEAD
      { src: '/assets/background1.png', speed: 0.5 },
      { src: '/assets/background2.png', speed: 3 },
=======
      { src: '/assets/background1.png', speed: 1 },
      { src: '/assets/background2.png', speed: 2 },
>>>>>>> dev
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
<<<<<<< HEAD
              y: 100 + Math.floor(Math.random() * 51) + 50,
=======
              y: 10 + getRandomInt(0, 50),
>>>>>>> dev
            },
            ctx: this.ctx,
            imageSrc: '/assets/enemy.png',
          }),
        );
      }
    }
  }

  private handleCollisions() {
<<<<<<< HEAD
    this.lasers.forEach((laser) => {
      this.enemies.forEach((enemy, eIdx) => {
        if (checkCircleCollision(enemy, laser)) {
          this.enemies.splice(eIdx, 1);
=======
    this.player.lasers.forEach((laser) => {
      this.enemies.forEach((enemy, eIdx) => {
        if (checkCollision(enemy, laser)) {
          this.enemies.splice(eIdx, 1);
          this.score += 100;
>>>>>>> dev
        }
      });
    });
  }
<<<<<<< HEAD
  private clearLasers() {
    if (this.lasers.length > 500) {
      this.lasers = this.lasers.slice(0, 400);
    }
  }
=======
>>>>>>> dev

  public render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.backgrounds.forEach((bg) => bg.render());
    this.player.render();
    this.spawnEnemies();
<<<<<<< HEAD
    this.lasers.forEach((el) => el.render());
    this.enemies.forEach((enemy) => enemy.render());
    this.handleCollisions();
    this.clearLasers();
=======
    this.enemies.forEach((enemy) => enemy.render());
    this.handleCollisions();
    this.scores.setScore(this.score);

>>>>>>> dev
    requestAnimationFrame(() => this.render());
  }
}
