  
"use strict";

class Potion {
    constructor(canvas, x, speed) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.height = 50;
        this.width = 25;        
        this.x = x; 
        this.y = 0 - this.height;
        this.speed = speed;
        this.potionImg = new Image();
        this.potionImg.src = 'img/potion.png';
    }

    draw() {
        this.ctx.drawImage(this.potionImg, this.x, this.y, this.width, this.height);
    }

    updatePosition() {
        this.y = this.y + this.speed;
    }

    isInsideScreen() {
        return (this.y < this.canvas.height && this.x + this.width/2 < this.canvas.width);
    }

}