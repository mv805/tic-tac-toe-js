/**
 * DOM element builder for a Tic-Tac-Toe game UI.
 */
class UIBuilder {
  /**
   * Builds the game UI.
   */
  buildUI() {
    document.body.appendChild(this.createHeader());
    document.body.appendChild(this.createGameBoard());
    document.body.appendChild(this.createNewGameButton());
    document.body.appendChild(this.createWinStatusArea());

    const footer = document.createElement("footer");
    footer.textContent = "By Matt Villa";

    document.body.appendChild(footer);
  }

  /**
   * Creates the game board.
   * @returns {HTMLElement} The created game board element.
   */
  createGameBoard() {
    const board = document.createElement("div");
    board.classList.add("game-board");

    const boardWrapper = document.createElement("div");
    boardWrapper.classList.add("game-board__board-wrapper");

    board.appendChild(boardWrapper);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement("div");
        cell.classList.add("game-board__cell");
        cell.id = `cell-${i}-${j}`;
        boardWrapper.appendChild(cell);
      }
    }

    return board;
  }

  /**
   * Creates the header for the game.
   * @returns {HTMLElement} The created header element.
   */
  createHeader() {
    const header = document.createElement("header");
    const title = document.createElement("h1");
    title.textContent = "Tic-Tac-Toe";
    const rules = document.createElement("h2");
    rules.textContent = "X goes first.";
    header.appendChild(title);
    header.appendChild(rules);

    return header;
  }

  /**
   * Creates the win status area for displaying game results.
   * @returns {HTMLElement} The created win status area element.
   */
  createWinStatusArea() {
    const winStatusArea = document.createElement("div");
    winStatusArea.classList.add("win-status");

    const xWinsHeader = document.createElement("h3");
    xWinsHeader.classList.add("win-status--grid-1");
    xWinsHeader.textContent = "X-Wins";

    const oWinsHeader = document.createElement("h3");
    oWinsHeader.classList.add("win-status--grid-2");
    oWinsHeader.textContent = "O-Wins";

    const xWinValue = document.createElement("div");
    xWinValue.classList.add("win-status__win-value", "win-status--grid-3");
    xWinValue.id = "x-win-field";
    xWinValue.textContent = "0";

    const oWinValue = document.createElement("div");
    oWinValue.classList.add("win-status__win-value", "win-status--grid-4");
    oWinValue.id = "o-win-field";
    oWinValue.textContent = "0";

    winStatusArea.appendChild(xWinsHeader);
    winStatusArea.appendChild(oWinsHeader);
    winStatusArea.appendChild(xWinValue);
    winStatusArea.appendChild(oWinValue);

    return winStatusArea;
  }

  /**
   * Creates the button for starting a new game.
   * @returns {HTMLElement} The created new game button element.
   */
  createNewGameButton() {
    const restartButtonWrapper = document.createElement("div");
    restartButtonWrapper.classList.add("restart-button");

    const restartButton = document.createElement("button");
    restartButton.classList.add("restart-button__button");
    restartButton.textContent = "New Game";

    restartButtonWrapper.appendChild(restartButton);

    return restartButtonWrapper;
  }
}

module.exports = UIBuilder;
