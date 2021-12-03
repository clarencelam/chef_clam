import Clam from "/src/clam";
import InputHandler from "/src/input";
import Food from "/src/food";
import Customer from "/src/customer";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 1200;
const GAME_HEIGHT = 800;

export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let background = document.getElementById("background");
let clam = new Clam(GAME_WIDTH, GAME_HEIGHT);
let bullets = [];
let customers = [];
let cust = new Customer(GAME_HEIGHT, GAME_WIDTH);

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

  cust.draw(ctx);
  cust.update(deltaTime);

  bullets = bullets.filter((bullet) => !bullet.marked_for_deletion);
  bullets.forEach((bullet, index) => {
    bullet.update(deltaTime);
    bullet.draw(ctx);
  });

  clam.update(deltaTime);
  clam.draw(ctx);

  requestAnimationFrame(gameLoop);
}
gameLoop();
