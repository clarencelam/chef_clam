import Clam from "/src/clam";
import InputHandler from "/src/input";
import Food from "/src/food";
import Customer from "/src/customer";
import { detectCollision } from "/src/collisionDetection";

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

// create customer list and add one
let customers = [];
let cust = new Customer(GAME_HEIGHT, GAME_WIDTH);
customers.push(cust);

let lastTime = 0;
new InputHandler(clam);

export function fireBullet() {
  bullets.push(new Food(clam.x_pos, clam.y_pos));
}

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  ctx.drawImage(background, 0, 0, 1200, 800);

  // update and draw customer objects
  customers = customers.filter((customer) => !customer.markfordelete);
  customers.forEach((customer, index) => {
    customer.update(deltaTime);
    customer.draw(ctx);
  });
  // reload customers array (temporary code, will flesh out cust gen)
  if (customers.length < 1) {
    customers.push(new Customer(GAME_HEIGHT, GAME_WIDTH));
  }

  // update and draw bullets
  bullets = bullets.filter((bullet) => !bullet.marked_for_deletion);

  // Code block to apply actions to each bullet active
  bullets.forEach((bullet, index) => {
    // if the bullet collides with any customer, run bullet.collide and cust.collide functions
    // will pause objects
    customers.forEach((customer, index) => {
      if (detectCollision(bullet, customer)) {
        bullet.hitCustomer();
        customer.hitFood();
        console.log(bullet.marked_for_deletion);
      }
    });
    bullet.update(deltaTime);
    bullet.draw(ctx);
  });

  clam.update(deltaTime);
  clam.draw(ctx);

  requestAnimationFrame(gameLoop);
}
gameLoop();
