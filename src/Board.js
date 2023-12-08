/**
 * Represents a tic-tac-toe game board.
 */
class Board {
  /**
   * Constructs a Board object with an empty 3x3 board.
   */
  constructor() {
    /**
     * Represents the game board as a 3x3 array.
     * @type {Array<Array<string>>}
     * @private
     */
    this._board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }

  /**
   * Marks the specified position on the board with the provided mark.
   * @param {number} row - The row index (0-2) of the position to mark.
   * @param {number} col - The column index (0-2) of the position to mark.
   * @param {string} mark - The mark to place on the board (e.g., 'x', 'o').
   * @throws {Error} Throws an error if the specified location is invalid.
   */
  markBoard(row, col, mark) {
    if (row >= this._board.length || col >= this._board[0].length) {
      throw new Error("Location does not exist on the Board.");
    }
    this._board[row][col] = mark;
  }

  /**
   * Returns a copy of the current game board.
   * @returns {Array<Array<string>>} A copy of the game board.
   */
  get board() {
    return this._board.map((row) => [...row]);
  }

  /**
   * Returns a the marker at the given board index. Will return empty string if not marked.
   * @param {number} row - The board row index (0-2).
   * @param {number} col - The board column index (0-2).
   * @returns {string} The mark at the given board location.
   * @throws {Error} Throws an error if the specified location is invalid.
   */
  getMarker(row, col) {
    if (row >= this._board.length || col >= this._board[0].length) {
      throw new Error("Location does not exist on the Board.");
    }
    return this._board[row][col];
  }

  /**
   * Returns the mark of the winning piece if a 3 in a row condition exists on the board. Returns an empty string if there is no winning position.
   * @returns {string} The winning mark (3 in a row), or an empty string.
   */
  getWinningMarker() {
    for (let row = 0; row < this._board.length; row++) {
      for (let col = 0; col < this._board[row].length; col++) {
        if (this.getWinningPositions(row, col)) {
          return this._board[row][col];
        }
      }
    }
    return "";
  }

  /**
   * Checks for a winning sequence starting from the provided coordinates in the game board.
   * @param {number} row - The row index of the starting position.
   * @param {number} col - The column index of the starting position.
   * @returns {Array<Array<number>>} An array of winning positions if a winning sequence is found starting from the given position. If no winning sequence is found, an empty array is returned.
   * @throws {Error} Throws an error if the provided location does not exist on the board.
   */
  getWinningPositions(row, col) {
    if (row >= this._board.length || col >= this._board[row].length) {
      throw new Error("Location does not exist on the Board.");
    }

    //stop early if at an empty position
    if (!this._board[row][col]) {
      return [];
    }

    let winningPositions = [];
    let checkMarker = this._board[row][col];

    //check horizontal
    for (let checkCol = col; checkCol < this._board[row].length; checkCol++) {
      if (this._board[row][checkCol] == checkMarker) {
        winningPositions.push([row, checkCol]);
      }
    }
    for (let checkCol = col - 1; checkCol >= 0; checkCol--) {
      if (this._board[row][checkCol] == checkMarker) {
        winningPositions.push([row, checkCol]);
      }
    }

    if (winningPositions.length == 3) {
      return winningPositions;
    } else {
      winningPositions.length = 0;
    }

    //check vertical
    for (let checkRow = row; checkRow < this._board.length; checkRow++) {
      if (this._board[checkRow][col] == checkMarker) {
        winningPositions.push([checkRow, col]);
      }
    }
    for (let checkRow = row - 1; checkRow >= 0; checkRow--) {
      if (this._board[checkRow][col] == checkMarker) {
        winningPositions.push([checkRow, col]);
      }
    }

    if (winningPositions.length == 3) {
      return winningPositions;
    } else {
      winningPositions.length = 0;
    }

    //check right diagonal
    let checkRow = row;
    let checkCol = col;
    while (checkRow >= 0 && checkCol < this._board[checkRow].length) {
      if (this._board[checkRow][checkCol] === checkMarker) {
        winningPositions.push([checkRow, checkCol]);
      } else {
        break;
      }
      checkRow--;
      checkCol++;
    }

    checkRow = row + 1;
    checkCol = col - 1;

    while (checkRow < this._board.length && checkCol >= 0) {
      if (this._board[checkRow][checkCol] === checkMarker) {
        winningPositions.push([checkRow, checkCol]);
      } else {
        break;
      }
      checkRow++;
      checkCol--;
    }

    if (winningPositions.length == 3) {
      return winningPositions;
    } else {
      winningPositions.length = 0;
    }

    checkRow = row;
    checkCol = col;

    //check left diagonal
    while (checkRow >= 0 && checkCol >= 0) {
      if (this._board[checkRow][checkCol] === checkMarker) {
        winningPositions.push([checkRow, checkCol]);
      } else {
        break;
      }
      checkRow--;
      checkCol--;
    }

    checkRow = row + 1;
    checkCol = col + 1;

    while (
      checkRow < this._board.length &&
      checkCol <= this._board[checkRow].length
    ) {
      if (this._board[checkRow][checkCol] === checkMarker) {
        winningPositions.push([checkRow, checkCol]);
      } else {
        break;
      }
      checkRow++;
      checkCol++;
    }

    if (winningPositions.length == 3) {
      return winningPositions;
    } else {
      return [];
    }
  }

  /**
   * Clears the game board, resetting it to an empty 3x3 board.
   */
  clearBoard() {
    for (let row = 0; row < this._board.length; row++) {
      for (let col = 0; col < this._board[row].length; col++) {
        this._board[row][col] = ""; // Set each cell to an empty string
      }
    }
  }

  /**
   * Checks if the game board is fully marked and there are no further moves to make available.
   * @returns {boolean} Returns true if the board is full (marked), false otherwise.
   */
  getBoardIsFull() {
    for (let row = 0; row < this._board.length; row++) {
      for (let col = 0; col < this._board[row].length; col++) {
        if (this._board[row][col] === "") {
          return false;
        }
      }
    }
    return true;
  }
  /**
   * Returns a string representation of the game board.
   * @returns {string} A string displaying the current state of the board.
   */
  toString() {
    return `
    [${this._board[0][0] || " "}] [${this._board[0][1] || " "}] [${
      this._board[0][2] || " "
    }]
    [${this._board[1][0] || " "}] [${this._board[1][1] || " "}] [${
      this._board[1][2] || " "
    }]
    [${this._board[2][0] || " "}] [${this._board[2][1] || " "}] [${
      this._board[2][2] || " "
    }]
    `;
  }
}

module.exports = Board;
