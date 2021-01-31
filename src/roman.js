"use strict";

class Roman extends Item {
    constructor(canvas, x, speed) {
        super(canvas, x, speed);
        this.itemImg.src = 'img/roman.png';
    }

    draw() {
        this.ctx.drawImage(this.itemImg, this.x, this.y, this.width, this.height);
    }

}