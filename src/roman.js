"use strict";

class Roman extends Item {
    constructor(canvas, x, speed) {
        super(canvas, x, speed);
        this.y = 0 - this.size;
    }

    draw() {
        this.ctx.fillStyle = "#111";

        // fillRect(x, y, width, height)
        this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }

}