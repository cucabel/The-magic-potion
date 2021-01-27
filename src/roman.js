"use strict";

class Roman {
    constructor(canvas, x, speed) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.height = 50;
        this.width = 25;         
        this.x = x; 
        this.y = 0 - this.height;
        this.speed = speed;
        this.romanImg = new Image();
        this.romanImg.src = 'img/roman.png';
    }

    draw() {
        this.ctx.drawImage(this.romanImg, this.x, this.y, this.width, this.height);
    }

    updatePosition() {
        this.y = this.y + this.speed;
    }

    isInsideScreen() {
        return (this.y < this.canvas.height && this.x + this.width < this.canvas.width);
    }

}