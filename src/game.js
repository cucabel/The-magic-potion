"use strict";

class Game {
    constructor() {
      this.canvas = null;
      this.ctx = null;
      this.items = []; // romans -enemies-, and potions, -rewards-
      this.player = null;
      this.gameIsOver = false;
      this.gameIsWon = false;
      this.gameScreen = null;
      this.audio = null;
    }
  
    start() {
      // Create ctx
      this.canvasContainer = document.querySelector(".canvas-container");
      this.canvas = this.gameScreen.querySelector("canvas");
      this.ctx = this.canvas.getContext("2d");
  
      // Save reference to lives, potions and score elements
      this.livesElement = this.gameScreen.querySelector(".lives .value");
      this.potionElement = this.gameScreen.querySelector(".potion .value");
      this.scoreElement = this.gameScreen.querySelector(".score .value");
  
      // Set canvas dimesions
      this.containerWidth = this.canvasContainer.offsetWidth;
      this.containerHeight = this.canvasContainer.offsetHeight;
      this.canvas.setAttribute("width", this.containerWidth);
      this.canvas.setAttribute("height", this.containerHeight);

      // Create player (*)
      this.player = new Player(this.canvas, 3);
  
      // Add event listener for moving the player
      this.handleKeyDown = event => {
        if (event.key === "ArrowRight") 
          this.player.setDirection("right");
        else if (event.key === "ArrowLeft") 
          this.player.setDirection("left");
      }
        
      document.body.addEventListener("keydown", this.handleKeyDown); // the keydown event is fired for all keys

      this.startLoop();
    }
  
    startLoop() {
      const loop = () => {
        const background = new Image();
        background.src = 'img/forest.jpg';
        // 1. UPDATE THE STATE OF PLAYER AND ENEMIES
  
        // 1.1. Create enemies randomly (*)
        if (Math.random() > 0.98) 
          this.items.push(new Roman(this.canvas, this.canvas.width * Math.random(), 2));
        else if (Math.random() > 0.99) 
          this.items.push(new Potion(this.canvas, this.canvas.width * Math.random(), 2));
  
        // 1.2. Check if player hits an a roman -an enemy-, or a potion, -a reward-
        this.checkCollisions();
  
        // 1.3. Update player and check if it goes off the screen
        this.player.handleScreenCollision();
  
        // 1.4. Move enemies and check if they go off the screen
        this.items = this.items.filter(i => {
          i.updatePosition();
          return i.isInsideScreen();
        });
 
        // 2. CLEAR THE CANVAS
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
        // 3. UPDATE THE CANVAS
        this.ctx.drawImage(background, 0, 0, this.canvas.width, this.canvas.height);
        this.player.draw();
        this.items.forEach(r => r.draw());
        
        // 4. TERMINATE LOOP IF THE GAME IS OVER
        if (!this.gameIsOver && !this.gameIsWon) 
          window.requestAnimationFrame(loop);
  
        // 5. UPDATE GAME STATUS
        this.updateGameStats();
      };
  
      window.requestAnimationFrame(loop);
    }
  
    checkCollisions() {
      this.items.forEach(i => {
        if (this.player.didCollide(i)) {
          this.audio = new Audio(this.player.setPotion(i)); //only sounds once
          this.audio.play();
          this.player.setLife();
  
          // Move the item off screen to the bottom
          i.y = this.canvas.height + i.size;
  
          if (this.player.lives < 0) 
            this.gameOver();
        }
      });
  }
  
    gameOver() {
      this.gameIsOver = true;
  
      // Call the `endGame` function from `main` to remove the Game screen and show the Game Over Screen
      endGame(this.player.score);
    }

    wonGame() {
      this.gameIsWon = true;
      success(this.player.score);
    }
  
    updateGameStats() {
      this.livesElement.innerHTML = this.player.lives;
      this.potionElement.innerHTML = this.player.potion;
      this.scoreElement.innerHTML = this.player.score;
    }
  }