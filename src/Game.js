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
    //clear the game board
    this._gameBoard.clearBoard();
    //clear the screen board
    this._gameUI.clearCells();
    //reset the listeners
    this.setResetButtonListener();
    this.setCellClickListeners();

    //remove the cell highlights of the winning combo
    this._gameUI.removeCellHighlights();

    //reset to 'x' as the first player to go.
    this.currentPlayer = this._xPlayer;

    //reset the game status field to default text
    this._gameUI.setGameStatusField();
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
    const targetCell = event.target;

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

    //then check for a win, if there is a win:
    const winningCombo = this._gameBoard.getWinningPositions(row, col);
    if (winningCombo.length === 3) {
      //    increment the wins++ for the player that won
      this.currentPlayer.incrementScore();
      //    update the player wins on the screen
      this._gameUI.updateScore(
        this.currentPlayer.marker,
        this.currentPlayer.score
      );
      //    highlight the game winning combo on the screen
      for (let cellCoordinate of winningCombo) {
        const [row, col] = cellCoordinate;
        this._gameUI.highlightWinningCombo(row, col);
      }
      //    lock the board
      //    remove all the cell click listeners
      this.setCellClickListeners(false);
      //set the winner text in the game status field
      this._gameUI.setGameStatusField(
        `The ${this.currentPlayer.marker.toUpperCase()} Player Wins!`
      );
      return;
    }
    //otherwise just switch to the other player
    this.toggleCurrentPlayer();
  }
}

module.exports = Game;
