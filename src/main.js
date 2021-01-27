"use strict";

let game;
let splashScreen;
let gameScreen;
let gameOverScreen;
let successScreen;

function buildDom(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString;
  return div.children[0];
}

function createSplashScreen() {
  splashScreen = buildDom(`
  <main class="splash-screen-container">
    <audio autoplay>
      <source src="sound/splashScreen.mp3" type="audio/mp3">
    </audio>
      <h1>The magic potion</h1>
      <p>You will get superhuman strength when you get 100 points, to do so, try to collect as many potions as possible, and avoid the romans,
      while moving to the rigth and the left with the arrow keys.</p>
      <button id="button">Start</button>
  </main>
      `);

  document.body.appendChild(splashScreen);

  const startButton = splashScreen.querySelector("button");
  startButton.addEventListener("click", startGame);
}

function removeSplashScreen() {
  // remove() is the DOM method that removes the Node from the page
  splashScreen.remove();
}

// -- game screen

function createGameScreen() { // here is where the canvas tag is
  gameScreen = buildDom(`
  <div class="parent-container">
    <main class="game container">
      <audio autoplay>
        <source src="sound/gameScreen.mp3" type="audio/mp3">
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
  </div>
      `);

  document.body.appendChild(gameScreen);
  return gameScreen;
}

function removeGameScreen() {
  gameScreen.remove();
}

// -- game over screen

function createGameOverScreen(score) {
  gameOverScreen = buildDom(`
  <main class="final-screen-container">
    <audio autoplay>
      <source src="sound/gameOver.wav" type="audio/mp3">
    </audio>
    <div class="div">
      <h1>Game over</h1>
      <p>Total score: <span> ${score} </span></p>
      <button id="button">Start</button>
    <div>
  </main>
  `);

  const button = gameOverScreen.querySelector("button");
  button.addEventListener("click", startGame);

  document.body.appendChild(gameOverScreen);
}

function createSuccessScreen(score) {
  successScreen = buildDom(`
  <main class="final-screen-container">
    <audio autoplay>
      <source src="sound/win.wav" type="audio/mp3">
    </audio>
    <div class="div">
      <h2>You got superhuman strength</h2>
      <p>Total score: <span> ${score} </span></p>
      <button id="button">Start</button>
    <div>
  </main>
  `);

  const button = successScreen.querySelector("button");
  button.addEventListener("click", startGame);

  document.body.appendChild(successScreen);
}

function removeGameOverScreen() {
  if (gameOverScreen !== undefined) {
    gameOverScreen.remove();
  }
}

function removeSuccessScreen() {
  if (successScreen !== undefined) {
    successScreen.remove();
  }
}

// -- Setting the game state - start or game over

function startGame() {
  removeSplashScreen();
  removeGameOverScreen();
  removeSuccessScreen();

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

function success(score) {
  removeGameScreen();
  createSuccessScreen(score);
}

// Runs the function `createSplashScreen` once all resources are loaded
window.addEventListener("load", createSplashScreen);