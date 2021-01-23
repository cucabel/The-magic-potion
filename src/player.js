"use strict";

class Player {
  constructor(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.lives = lives;
    this.potion = 0;
    this.score = 0;
    this.size = 40;
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - this.size;
    this.direction = 0;
    this.speed = 5;
  }

  setDirection(direction) {
    // +1 down  -1 up
    if (direction === "right") this.direction = 1;
    else if (direction === "left") this.direction = -1;
  }

  handleScreenCollision() {
    this.x += this.direction * this.speed;
    const screenRight = this.canvas.weight;
    const screenLeft = 0;

    const playerRight = this.x + this.size;
    const playerLeft = this.x;

    if (playerRight > screenRight) this.direction = -1;
    else if (playerLeft < screenLeft) this.direction = 1;
  }

  setPotion(item) {
    if (item instanceof Potion)
      this.potion += 10;
      this.score += 10;
    if (item instanceof Roman)
      this.potion -= 10;
  }

  setLife() {
    if (this.potion >= 100) {
      this.lives += 1;
      this.potion = 0;
    } else if (this.potion < 0) {
      this.lives -= 1;
      this.potion = 0;
    }
  }

  draw() {
    this.ctx.fillStyle = "#FF1493";
    // fillRect(x, y, width, height)
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  didCollide(item) {
    const playerLeft = this.x;
    const playerRight = this.x + this.size;
    const playerTop = this.y;
    const playerBottom = this.y + this.size;

    const itemLeft = item.x;
    const itemRight = item.x + item.size;
    const itemTop = item.y;
    const itemBottom = item.y + item.size;

    // Check if the item sides intersect with any of the player's sides
    const crossLeft = itemLeft <= playerRight && itemLeft >= playerLeft;

    const crossRight = itemRight >= playerLeft && itemRight <= playerRight;

    const crossBottom = itemBottom >= playerTop && itemBottom <= playerBottom;

    if (crossLeft || crossRight || crossBottom) {
      return true;
    } else {
      return false;
    }
  }
}