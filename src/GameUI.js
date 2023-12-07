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
  initialize() {
    const uiBuilder = new UIBuilder();
    uiBuilder.buildUI();
  }

  updateCellMarker() {
    //updates a board cell with a given marker
  }

  getCell() {
    //returns the cell node at the given coordinate
  }

  clearCells() {
    //clears all the cells of any markers
  }

  updateScore() {
    //updates the score value for the given player
  }

  highlightWinningCombo() {
    //highlight the winning combination on the screen
  }

  getNewGameButton() {
    //returns the new game button
    const restartButton = document.querySelector(".restart-button__button");
  }
}

module.exports = GameUI;
