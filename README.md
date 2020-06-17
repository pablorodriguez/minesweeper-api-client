# minesweeper-api-client
This is a simple API client to play the Minesweepers Game.

# How to install and run Minesweepers from a Terminal
clone this repo
`git@github.com:pablorodriguez/minesweeper-api-client.git`
`run npm install`

# List of command to paly Minesweepers Game
Comman pattern
`node index.js COMMAND_NAME PARAMS`
To list games for a specific user run this

# Open a terminal
This are the available commandsto run

1. node index.js list USER_NAME => To get the list of games for a ser
2. node index.js start USER_NAME GAME_NAME X Y AMOUNT_OF_MINE => To create a new game for a user
3. node index.js stop GAME_NAME => To stop playing the game
4. node index.js play GAME_NAME => To start playing the game
5. node index.js show USER_NAME GAME_NAME => to show a specific game
6. node index.js click USER_NAME GAME_NAME X Y => to click over a cell in a game
7. node index.js flag USER_NAME GAME_NAME X Y => to add a flag over a cell in a game

# Notes
This is not what I would expect for real life API Client, I code this because I try to use a different languge from the Server Side
Im not an expert on Node JS, I know that thare are must better example about how to code a API client to consume that Game's API