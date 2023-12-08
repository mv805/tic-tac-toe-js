const Board = require("./Board.js");
const GameUI = require("./GameUI.js");
const Player = require("./Player.js");
class Game {
  constructor() {
    this._gameBoard = new Board();
    this._gameUI = new GameUI();
    this._gameUI.initialize();

    this._oPlayer = new Player("o");
    this._xPlayer = new Player("x");
    this._currentPlayer = this._xPlayer;

    this.resetGame = this.resetGame.bind(this);
    this.handlePlayerCellClick = this.handlePlayerCellClick.bind(this);

    this.setResetButtonListener();
    this.setCellClickListeners();
  }

  get currentPlayer() {
    return this._currentPlayer;
  }

  set currentPlayer(newCurrentPlayer) {
    this._currentPlayer = newCurrentPlayer;
  }
  /**
   * Adds a click event listener to the given cell.
   * @param {HTMLElement} cell - The cell element to add the listener to.
   */
  addClickListener(cell) {
    cell.addEventListener("click", this.handlePlayerCellClick);
  }

  /**
   * Removes a click event listener from the given cell.
   * @param {HTMLElement} cell - The cell element to remove the listener from.
   */
  removeClickListener(cell) {
    cell.removeEventListener("click", this.handlePlayerCellClick);
  }

  /**
   * Adds or removes game click event listeners to all the board cells.
   * @param {boolean} [on=true] - Indicates whether to add or remove the listeners. Default is true (add listeners).
   */
  setCellClickListeners(on = true) {
    const cells = this._gameUI.getBoardCells();
    for (const cell of cells) {
      if (on) {
        this.addClickListener(cell);
      } else {
        this.removeClickListener(cell);
      }
    }
  }

  /**
   * Toggles the current player to either 'x' or 'o'.
   */
  toggleCurrentPlayer() {
    if (this.currentPlayer === this._oPlayer) {
      this.currentPlayer = this._xPlayer;
    } else {
      this.currentPlayer = this._oPlayer;
    }
  }

  /**
   * Reset all the game state and prepare the board for another new game.
   */
  resetGame(event) {
    console.log(event.type);
    //clear the game board
    this._gameBoard.clearBoard();
    //clear the screen board
    this._gameUI.clearCells();
    //reset the listeners
    this.setResetButtonListener();
    this.setCellClickListeners();

    //reset to 'x' as the first player to go.
    this.currentPlayer = this._xPlayer;
  }

  /**
   * Adds the newgame/reset button listeners (turns them on).
   */
  setResetButtonListener() {
    const newGameButton = this._gameUI.getNewGameButton();

    newGameButton.addEventListener("click", this.resetGame);
  }

  handlePlayerCellClick(event) {
    const cellId = event.target.id;
    const [, row, col] = cellId.split("-").map(Number);
    const targetCell = this._gameUI.getCell(row, col);

    //check if a clicked cell is already full, if it is full,
    //do nothing and return
    if (targetCell.textContent) {
      return;
    } else {
      //otherwise go ahead fill it with the current players marker
      this._gameUI.updateCellMarker(row, col, this.currentPlayer.marker);
      //add the piece to the board object
      this._gameBoard.markBoard(row, col, this.currentPlayer.marker);
      this.removeClickListener(targetCell);
    }

    //
    //then check for a win, if there is a win:
    //    increment the wins++ for the player that won
    //    update the player wins on the screen
    //    highlight the game winning combo on the screen
    //    lock the board
    //    remove all the cell click listeners (not reset button)

    //otherwise just switch to the other player
    this.toggleCurrentPlayer();
  }
}

module.exports = Game;
