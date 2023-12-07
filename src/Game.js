const Board = require("./Board.js");
const GameUI = require("./GameUI.js");

class Game {
  constructor() {
    this._gameBoard = new Board();
    this._gameUI = new GameUI();
    this._gameUI.initialize();
  }

  setCellClickListeners() {
    //adds the listeners to the game cells to be ready for player clicks
  }
  resetGame() {
    //clear the game board
    //clear the screen board
    //reset the listeners
  }

  setRestButtonListeners() {
    //set the reset button listener
  }
  handlePlayerCellClick() {
    //check if a clicked cell is already full, if it is full:
    //    do nothing and return
    //otherwise go ahead fill it with the current players marker
    //add the piece to the board object
    //
    //then check for a win, if there is a win:
    //    increment the wins++ for the player that won
    //    update the player wins on the screen
    //    highlight the game winning combo on the screen
    //    lock the board
    //    remove all the cell click listeners (not reset button)
    //otherwise just switch to the other player
  }
}

module.exports = Game;
