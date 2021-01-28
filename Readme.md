# The magic potion

## Description
The aim of the game is to get superhuman strength, for that the player should try to get as many potions as possible, while avoiding romans.


## MVP (DOM - CANVAS)
The player can move to the left and the right, and get the required number of potions to get the superhuman strenght. The game is over when the player runs out of lives due to the collisions with the romans that randomly are falling from above him. The game is won when the player reaches 1000 points, when has collected 100 potions.


## Backlog
Stop the player movement
Add levels
Add move items to iterate with

## Data structure
Classes and methods definition.

index.html

Main class.
Properties:
- game
- splashScreen
- gameScreen
- gameOverScreen
- successScreen

Methods: 
- buildDom
- createSplashScreen / removeSplashScreen
- createGameScreen / removeGameScreen
- createSuccessScreen / removeSuccessScreen
- createGameOverScreen / removeGameOverScreen
- startGame / endGame

Game class.
Properties:
- canvas
- ctx
- romans
- potions
- player
- gameIsOver
- gameIsWon
- gameScreen
- audio

Methods:
- start
- startLoop
- checkCollision
- gameOver
- wonGame
- updateGameStats

Player class.
Properties:
- canvas
- ctx
- lives
- potion
- score
- height
- width
- x
- y
- direction
- speed
- asterixImg
- asterixImg.src

Methods:
- setDirection
- handleScreenCollision
- setPotion
- setLife
- draw
- didCollide

Roman class.
Properties:
- canvas
- ctx
- height
- width
- x
- y
- speed
- romanImg
- romanImg.src

Methods:
- draw
- updatePositio
- isInsideScreen

Potion class.
Properties:
- canvas
- ctx
- height
- width
- x
- y
- speed
- potionImg
- potionImg.src

Methods:
- draw
- updatePositio
- isInsideScreen


## States y States Transitions
Definition of the different states and their transition (transition functions)

splashScreen
- Start the game
- Goes to gameScreen when Start button is clicked

gameScreen
- Game running while lives > 0
- Goes to gameoverScreen if lives < 0
- Goes to winScreen if Player score > 1000

gameoverScreen
- Shows Game Over message and Restart button
- Goes back to Game Screen when Restart button is clicked

successScreen
- Shows Win message, random quote, and Restart button
- Goes back to Game Screen when Restart button is clicked

## Task
Task definition in order of priority

- Setup git & GitHub
- Create and connect files: main.js, game.js, player.js, roman.js, potion.js
- BuildDom in main.js
- Create 4 screens in main.js
- Create screenTransitions in main.js
- Create Game class
- Create loop in game.js
- Create Player class
- Create Roman class
- Create Potion class
- Draw player in game.js
- Move player in game.js
- Draw Romans in game.js
- Move Romans in game.js
- Draw Potions in game.js
- Move Potions in game.js
- Check Collisions in game.js
- Check game result in game.js
- Add audios, img and fonts


## Links


### Trello
[Link url](https://trello.com/b/vEfwGIKp/game)


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/cucabel/The-magic-potion)
[Link Deploy](https://cucabel.github.io/The-magic-potion/)


### Slides
URls for the project presentation (slides)
[Link Slides.com](https://docs.google.com/presentation/d/1jO7IY5U1ve2GpcmYmiNnJMGrfWd_GqJzvjnkz__DDZ4/edit?usp=sharing)