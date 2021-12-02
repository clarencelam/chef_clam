import Clam from "/src/clam";
import InputHandler from "/src/input";
import Food from "/src/food";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 1200;
const GAME_HEIGHT = 800;

let background = document.getElementById("background");
let clam = new Clam(GAME_WIDTH, GAME_HEIGHT);
let bullets = [];
let lastTime = 0;
new InputHandler(clam);

export function fireBullet() {
  bullets.push(new Food(clam.x_pos, clam.y_pos));
  console.log(bullets.length);
}

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  ctx.drawImage(background, 0, 0, 1200, 800);

  bullets.forEach((bullet, index) => {
    bullet.update(deltaTime);
    bullet.draw(ctx);
  });

  clam.update(deltaTime);
  clam.draw(ctx);

  requestAnimationFrame(gameLoop);
}
gameLoop();
