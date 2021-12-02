export default class Food {
  constructor(x, y) {
    this.image = document.getElementById("nigiri_img");
    this.x_pos = x;
    this.y_pos = y;
    this.size = 50;
    this.speed = 10;
  }

  draw(ctx) {
    var time = new Date();
    ctx.save();
    ctx.translate(this.x_pos + this.size / 2, this.y_pos + this.size / 2);
    ctx.rotate(
      ((2 * Math.PI) / 6) * time.getSeconds() +
        ((2 * Math.PI) / 6000) * time.getMilliseconds()
    );
    ctx.drawImage(
      this.image,
      (this.size / 2) * -1,
      (this.size / 2) * -1,
      this.size,
      this.size
    );
    ctx.restore();
  }

  update(deltaTime) {
    this.x_pos += this.speed;
  }
}
