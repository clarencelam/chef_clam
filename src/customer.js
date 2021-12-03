import { randomIntFromInterval } from "/src/index";
export default class Customer {
  // class to represent the cusomter fish that player will feed

  constructor(gameHeight, gameWidth) {
    this.img_frame1 = document.getElementById("fish_1");
    this.img_frame2 = document.getElementById("fish_2");
    this.size = 80;
    this.speed = 4;
    this.return_speed = 5;
    this.turned_around = false;
    this.hunger_points = 1;
    this.marked_for_deletion = false;
    this.GAMEWIDTH = this.gameWidth;

    this.min = 0;
    this.max = gameHeight * 0.75;
    const rndInt = randomIntFromInterval(this.min, this.max);

    this.x_pos = this.gameWidth - this.size;
    this.x_direction = -1; //heading left to start
    this.y_pos = rndInt;

    this.walking = true;
    // variable to declare where the customer will stop & turn around
    this.x_walk_threshold = this.size * 2;
    // time waited after customer gets to walk threshold
    this.wait_time = 150;
  }

  apply_return_speed() {
    this.speed = this.return_speed;
  }

  draw(ctx) {
    // swap the image frames per second when cust is walking
    const newtime = new Date();
    let s = newtime.getMilliseconds();
    if (this.walking === true) {
      if (s < 500) {
        this.img = this.img_frame1;
      } else {
        this.img = this.img_frame2;
      }
    }

    // if the customer turns around, draw image flipped. Else, draw regularly
    if (this.turned_around === true) {
      ctx.translate(this.x_pos + this.size, this.y_pos);
      // scaleX by -1; this "trick" flips horizontally
      ctx.scale(-1, 1);
      // draw the img, no need for x,y since we've already translated
      ctx.drawImage(this.img, 0, 0);
      // always clean up -- reset transformations to default
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    } else {
      ctx.drawImage(this.img, this.x_pos, this.y_pos, this.size, this.size);
    }
  }

  update(deltaTime) {
    // If customer is at x_walk_threshold, wait for this.wait_time, then return to the right
    if (this.x_pos <= this.x_walk_threshold) {
      if (this.wait_time > 0) {
        this.speed = 0;
        this.walking = false;
        this.wait_time = this.wait_time - 1;
      } else {
        this.apply_return_speed();
        this.turned_around = true;
        this.walking = true;
      }
      this.x_direction = 1;
    }
    // if customer is past the game-width, they have exited without being fed. Mark for deletion
    if (this.x_pos > this.GAMEWIDTH) {
      this.marked_for_deletion = true;
    }
    this.x_pos = this.x_pos + this.speed * this.x_direction;
  }
}
