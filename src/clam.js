export default class Clam {
  constructor(gameWidth, gameHeight) {
    this.img = document.getElementById("clam_default");
    this.GAMEWIDTH = gameWidth;
    this.GAMEHEIGHT = gameHeight;
    this.x_pos = gameWidth / 2;
    this.y_pos = gameHeight / 3;
    this.size = 75;
    this.x_speed = 5;
    this.y_speed = 4;

    this.moving_left = false;
    this.moving_right = false;
    this.moving_up = false;
    this.moving_down = false;

    this.shooting = false;
  }

  rotateClam(ctx, deg) {
    ctx.save();
    var rad = (deg * Math.PI) / 180;
    ctx.translate(this.x_pos + this.size / 2, this.y_pos + this.size / 2);
    ctx.rotate(rad);
    ctx.drawImage(this.img);
  }

  update(deltaTime) {
    if (!deltaTime) return;

    if (this.moving_left === true && this.x_pos > 0) {
      this.x_pos = this.x_pos - this.x_speed;
    }
    if (this.moving_right === true && this.x_pos < this.GAMEWIDTH - this.size) {
      this.x_pos = this.x_pos + this.x_speed;
    }
    if (this.moving_up === true && this.y_pos > 0) {
      this.y_pos = this.y_pos - this.y_speed;
    }
    if (this.moving_down === true && this.y_pos < this.GAMEHEIGHT - this.size) {
      this.y_pos = this.y_pos + this.y_speed;
    }
    //if (this.angle_up === true) {
    //;
  }

  draw(ctx) {
    // Draw the clam to the screen. If it is shooting, draw its shooting animation
    if (this.shooting === true) {
      ctx.save();
      // Tilts the clam 30 degrees when shooting
      var rad = (30 * Math.PI) / 180;
      ctx.translate(this.x_pos + this.size / 2, this.y_pos + this.size / 2);
      ctx.rotate(rad);
      ctx.drawImage(
        this.img,
        (this.size / 2) * -1,
        (this.size / 2) * -1,
        this.size,
        this.size
      );
      ctx.restore();
    } else {
      ctx.drawImage(this.img, this.x_pos, this.y_pos, this.size, this.size);
    }
  }
}
