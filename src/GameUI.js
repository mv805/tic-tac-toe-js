const UIBuilder = require("./UIBuilder.js");

/**
 * Game UI accesible interface for getting elements from the DOM and making changes.
 */
class GameUI {
  /**
   * Retrieves all board cells or cells matching a specific marker.
   * @param {string} [markerToMatch] - Optional marker value to match against cell content.
   * @returns {NodeListOf<Element>|Array<Element>} - A NodeList of elements or an array of matching cells.
   */
  getBoardCells(markerToMatch) {
    if (markerToMatch) {
      const allBoardCells = document.querySelectorAll(`.game-board__cell`);
      const matchingCells = Array.from(allBoardCells).filter(
        (cell) => cell.textContent == markerToMatch
      );
      return matchingCells;
    } else {
      return document.querySelectorAll(".game-board__cell");
    }
  }
  /**
   * Builds the UI components for the tic tac toe game.
   */
  initialize() {
    const uiBuilder = new UIBuilder();
    uiBuilder.buildUI();
  }

  /**
   * Updates a board cell with a given marker.
   * @param {number} row - The row of the cell.
   * @param {number} col - The column of the cell.
   * @param {string} marker - The marker to update the cell with.
   */
  updateCellMarker(row, col, marker) {
    const cell = this.getCell(row, col);
    cell.textContent = marker;
  }

  /**
   * Retrieves the cell element based on the row and column identifiers.
   * @param {number} row - The row of the cell.
   * @param {number} col - The column of the cell.
   * @returns {HTMLElement} The cell element.
   */
  getCell(row, col) {
    const cell = document.querySelector(`#cell-${row}-${col}`);
    return cell;
  }

  /**
   * Clears all the cells of any markers.
   */
  clearCells() {
    const boardCells = this.getBoardCells();

    for (let cell of boardCells) {
      const cellId = cell.id;
      const [, row, col] = cellId.split("-").map(Number);
      this.updateCellMarker(row, col, "");
    }
  }

  //updates the score value for the given player
  updateScore(playerMarkerToUpdate, newScore) {
    const playerScoreCount = document.querySelector(
      `#${playerMarkerToUpdate}-win-count`
    );
    playerScoreCount.textContent = newScore;
  }

  //highlight the winning combination on the screen
  highlightWinningCombo(row, col) {
    const cellToHighlight = document.querySelector(`#cell-${row}-${col}`);
    cellToHighlight.classList.add("game-board__cell--highlighted");
  }
  /**
   * Removes all the highlights from the cells that are currently highlighted.
   */
  removeCellHighlights() {
    const highlightedCells = document.querySelectorAll(
      ".game-board__cell--highlighted"
    );
    for (let cell of highlightedCells) {
      cell.classList.remove("game-board__cell--highlighted");
    }
  }

  getNewGameButton() {
    const newGameButton = document.querySelector(".new-game-button__button");
    return newGameButton;
  }

  setGameStatusField(text) {
    const gameStatusField = document.querySelector("#game-status-field");
    if (text) {
      console.log("Should enter this text:", text);
      gameStatusField.textContent = text;
    } else {
      gameStatusField.textContent = "X goes first.";
    }
  }
}

module.exports = GameUI;
