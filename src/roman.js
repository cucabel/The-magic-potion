"use strict";

class Roman /*extends Item*/ {
    /*constructor(canvas, x, speed, ctx, height, width, y) {
    super(canvas, x, speed, ctx, height, width, y);
    super(canvas, x, speed);*/
    constructor(canvas, x, speed) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.height = 50;
        this.width = 25;
        this.x = x;  
        this.y = 0 - this.size;
        this.speed = speed;
        this.romanImg = new Image();
        this.romanImg.src = '../img/roman.png';
    }

    draw() {
        this.ctx.drawImage(this.romanImg, this.x, this.y, this.width, this.height);
    }

    updatePosition() {
        //this.x = this.x - this.speed;
        this.y = this.y + this.speed;
    }

    isInsideScreen() {
        // if x plus half of its size is smaller then 0 return
        //return this.x + this.size / 2 > 0;
        return this.y < this.canvas.height;
    }

}