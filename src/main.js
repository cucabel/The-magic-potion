"use strict";

let game;
let splashScreen;
let gameScreen;
let gameOverScreen;

function buildDom(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString;
  return div.children[0];
}

function createSplashScreen() {
  splashScreen = buildDom(`
      <main class="splash-screen-container">
        <audio autoplay>
          <source src="../sound/splashScreen.mp3" type="audio/mp3">
        </audio>
        <h1>The magic potion</h1>
        <button>Start</button>
      </main>
      `);

  document.body.appendChild(splashScreen);

  const audio = splashScreen.querySelector("audio");
  const startButton = splashScreen.querySelector("button");

  audio.loop = true; //Sets or returns whether the audio/video should start over again when finished
  startButton.addEventListener("click", startGame);
}

function removeSplashScreen() {
  // remove() is the DOM method that removes the Node from the page
  splashScreen.remove();
}

// -- game screen

function createGameScreen() { // here is where the canvas tag is
  gameScreen = buildDom(`
      <main class="game container">
        <audio autoplay>
          <source src="../sound/gameScreen.mp3" type="audio/mp3">
        </audio>
        <header>
          <div class="lives">
            <span class="label">Lives:</span>
            <span class="value"></span>
          </div>
          <div class="potion">
            <span class="label">Potion:</span>
            <span class="value"></span>
          </div>
          <div class="score">
            <span class="label">Score:</span>
            <span class="value"></span>
          </div>
        </header>
        <div class="canvas-container">
          <canvas></canvas> 
        </div>
      </main>
      `);

  document.body.appendChild(gameScreen);

  const audio = splashScreen.querySelector("audio");
  audio.loop = true;

  return gameScreen;
}

function removeGameScreen() {
  gameScreen.remove();
}

// -- game over screen

function createGameOverScreen(score) {
  gameOverScreen = buildDom(`
    <main class="game-over-container">
      <audio autoplay>
        <source src="../sound/gameOver.wav" type="audio/mp3">
      </audio>
      <h1>Game over</h1>
      <p>Your score: <span> ${score} </span></p>
      <button>Restart</button>
    </main>
  `);

  const audio = splashScreen.querySelector("audio");
  const button = gameOverScreen.querySelector("button");
  
  audio.loop = true; 
  button.addEventListener("click", startGame);

  document.body.appendChild(gameOverScreen);
}

function removeGameOverScreen() {
  if (gameOverScreen !== undefined) {
    gameOverScreen.remove();
  }
}

// -- Setting the game state - start or game over

function startGame() {
  removeSplashScreen();
  removeGameOverScreen();

  createGameScreen();

  game = new Game();
  game.gameScreen = gameScreen;

  // Start game
  game.start();
}

function endGame(score) {
  removeGameScreen();
  createGameOverScreen(score);
}

// Runs the function `createSplashScreen` once all resources are loaded
window.addEventListener("load", createSplashScreen);