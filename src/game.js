"use strict";

class Game {
    constructor() {
      this.canvas = null;
      this.ctx = null;
      //this.items = [];
      this.romans = [];
      this.potions = [];
      this.player = null;
      this.gameIsOver = false;
      this.gameScreen = null;
    }
  
    // Create `ctx`, a `player` and start the Canvas loop
    start() {
      this.canvasContainer = document.querySelector(".canvas-container");
      this.canvas = this.gameScreen.querySelector("canvas");
      //this.audio = this.gameScreen.querySelector("audio source").getAttribute(src);
      //this.audioSrc = this.gameScreen.querySelector("audio").src; append another src to audio to play at the same time
      //this.audioSrc = this.gameScreen.querySelector("audio source").src;
      this.ctx = this.canvas.getContext("2d");
  
      // Save reference to the score and live elements
      this.livesElement = this.gameScreen.querySelector(".lives .value");
      this.potionElement = this.gameScreen.querySelector(".potion .value");
      this.scoreElement = this.gameScreen.querySelector(".score .value");
  
      // Set the canvas dimesions to match the parent
      this.containerWidth = this.canvasContainer.offsetWidth;
      this.containerHeight = this.canvasContainer.offsetHeight;
      this.canvas.setAttribute("width", this.containerWidth);
      this.canvas.setAttribute("height", this.containerHeight);

      this.player = new Player(this.canvas, 2);
  
      // Add event listener for moving the player
      function handleKeyDown(event) {
        if (event.key === "ArrowRight") {
          this.player.setDirection("right");
        } else if (event.key === "ArrowLeft") {
          this.player.setDirection("left");
        }
      }
  
      // Any function provided to eventListener is always invoked by the `window` global object
      // Therefore, we need to bind `this` to the `game` object,
      // to prevent `this` from referencing the `window` object
      const boundHandleKeyDown = handleKeyDown.bind(this);
      document.body.addEventListener("keydown", boundHandleKeyDown); // the keydown event is fired for all keys
  
      this.startLoop();
    }
  
    startLoop() {
      const loop = function () {
        const background = new Image();
        background.src = '../img/forest.jpg';
        // 1. UPDATE THE STATE OF PLAYER AND ENEMIES
  
        // // 0. Our player was already created - via `game.start()`
  
        // // 1. Create new enemies randomly
        if (Math.random() > 0.99) { // setInterval
          let roman = new Roman(this.canvas, this.canvas.width * Math.random(), 1);
          console.log(roman);
          this.romans.push(roman);
          console.log(this.romans);
          //this.items.push(roman);
        } else if (Math.random() > 0.98) {
          let potion = new Potion(this.canvas, this.canvas.width * Math.random(), 1);
          this.potions.push(potion);
          //this.items.push(potion);
        }
  
        // // 2. Check if player had hit any enemy (check all enemies)
        this.checkCollisions();
  
        // // 3. Update the player and check if player is going off the screen
        this.player.handleScreenCollision();
  
        // // 4. Move the existing enemies
        // // 5. Check if any enemy is going of the screen
        /*this.romans = this.romans.map(r => r.updatePosition()).filter(r => r.isInsideScreen());*/

        //this.romans = this.romans.filter(function (r) {
          /*this.items = this.items.filter(function (i) {
            i.updatePosition();
          return i.isInsideScreen();
        });*/

        this.romans = this.romans.filter(function (r) {
            r.updatePosition();
          return r.isInsideScreen();
        });
        
        //this.potions = this.potions.filter(function (p) {
        this.potions = this.potions.filter(function (p) {
            p.updatePosition();
          return p.isInsideScreen();
        });
 
        // 2. CLEAR THE CANVAS
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
        // 3. UPDATE THE CANVAS
        this.ctx.drawImage(background, 0, 0, this.canvas.width, this.canvas.height);
        // // Draw the player
        this.player.draw();
  
        // // Draw the enemies
        /*this.items.forEach(function (i) {
          i.draw();
        });*/

        /*console.log(this.romans);*/
        this.romans.forEach(function (r) {
          r.draw();
          console.log(r);
        });
  
        this.potions.forEach(function (p) {
          p.draw();
        });
        
        // 4. TERMINATE LOOP IF THE GAME IS OVER
        if (!this.gameIsOver) {
          window.requestAnimationFrame(loop);
        }
  
        // 5. UPDATE GAME STATUS
        this.updateGameStats();
      }.bind(this);
  
      // As loop function will be continuously invoked by
      // the `window` object- `window.requestAnimationFrame(loop)`
      // we have to bind the function so that value of `this` is
      // pointing to the `game` object, like this:
      // var loop = (function(){}).bind(this);
  
      window.requestAnimationFrame(loop);
    }
  
    checkCollisions() {
      /*this.items.forEach(function (i) {
        // We will implement didCollide() in the next step
        if (this.player.didCollide(i)) {
          let audioSrc = this.player.setPotion(i);
          let itemSound = new Audio(audioSrc);
          itemSound.play();
          this.player.setLife();
  
          // Move the enemy off screen to the left
          i.y = this.canvas.height + i.size;
  
          if (this.player.lives === 0) {
            this.gameOver();
          }
        }
      }, this);*/

      this.romans.forEach(function (r) {
        // We will implement didCollide() in the next step
        if (this.player.didCollide(r)) {
          this.player.setPotion(r);
          this.player.setLife();
  
          // Move the enemy off screen to the left
          r.y = this.canvas.height + r.size;
  
          if (this.player.lives === 0) {
            this.gameOver();
          }
        }
      }, this);
      // We have to bind `this`
      // as array method callbacks `this` value defaults to undefined.
      this.potions.forEach(function (p) {
        // We will implement didCollide() in the next step
        if (this.player.didCollide(p)) {
          this.player.setPotion(p);
          this.player.setLife();
  
          // Move the enemy off screen to the left
          p.y = this.canvas.height + p.size;
  
          if (this.player.lives === 0) {
            this.gameOver();
          }
        }
      }, this);
    }
  
    gameOver() {
      // flag `gameIsOver = true` stops the loop
      this.gameIsOver = true;
  
      // Call the `endGame` function from `main` to remove the Game screen
      // and show the Game Over Screen
      endGame(this.player.score);
    }
  
    updateGameStats() {
      this.livesElement.innerHTML = this.player.lives;
      this.potionElement.innerHTML = this.player.potion;
      this.scoreElement.innerHTML = this.player.score;
    }
  }