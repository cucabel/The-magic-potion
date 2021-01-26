"use strict";

class Player {
  constructor(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.lives = lives;
    this.potion = 0;
    this.score = 0;
    this.height = 100;
    this.width = 50;
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - this.height;
    this.direction = 0;
    this.speed = 3;
    this.asterixImg = new Image();
    this.asterixImg.src = '../img/asterix.png';
  }

  setDirection(direction) {
    // +1 down  -1 up
    if (direction === "right") this.direction = 1;
    else if (direction === "left") this.direction = -1;
  }

  handleScreenCollision() {
    this.x = this.x + this.direction * this.speed;
    const screenRight = this.canvas.weight;
    const screenLeft = 0;

    const playerRight = this.x + this.width;
    const playerLeft = this.x;

    if (playerRight > screenRight) this.direction = -1;
    else if (playerLeft < screenLeft) this.direction = 1;
  }

  setPotion(item) {
    let audioSrc = null;
    if (item instanceof Potion) {
      audioSrc = '../sound/potion.wav';
      this.potion += 10;
      this.score += 10;
    } 
    if (item instanceof Roman) {
      audioSrc = '../sound/roman.wav';
      this.potion -= 10;
    }
    return audioSrc;
  }

  setLife() {
    if (this.potion > 100) {
      this.lives += 1;
      this.potion = 0;
    } else if (this.potion < 0) {
      this.lives -= 1;
      this.potion = 100;
    }
  }

  draw() {
     this.ctx.drawImage(this.asterixImg, this.x, this.y, this.width, this.height);
  }

  didCollide(item) {
    const playerLeft = this.x;
    const playerRight = this.x + this.width;
    const playerTop = this.y;
    const playerBottom = this.y + this.height;

    const itemLeft = item.x;
    const itemRight = item.x + item.width;
    const itemBottom = item.y + item.height;
    const itemTop = item.y;

    // Check if the item sides intersect with any of the player's sides
    const crossLeft = itemLeft <= playerRight && itemLeft >= playerLeft;

    const crossRight = itemRight >= playerLeft && itemRight <= playerRight;

    const crossTop = itemBottom >= playerTop && itemBottom <= playerBottom;

    const crossBottom = itemTop <= playerBottom && itemTop >= playerTop;

    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {      
      return true;
    } else {
      return false;
    }
  }
}