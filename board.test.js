const { Board } = require("./board.js");

describe("Board tests", () => {
  let gameBoard;

  beforeEach(() => {
    gameBoard = new Board();
  });
  describe("Marking behavior", () => {
    test("Mark board marks correctly", () => {
      gameBoard.markBoard(0, 0, "x");
      expect(gameBoard.board[0][0]).toBe("x");
      gameBoard.markBoard(2, 2, "o");
      expect(gameBoard.board[2][2]).toBe("o");
    });

    test("markBoard: Out of bound marks triggers errors.", () => {
      let expectedOutOfBoundsErrorMessage =
        "Location does not exist on the Board.";
      expect(() => gameBoard.markBoard(3, 3, "x")).toThrow(
        expectedOutOfBoundsErrorMessage
      );

      expect(() => gameBoard.markBoard(0, 0, "x")).not.toThrow(
        expectedOutOfBoundsErrorMessage
      );
      expect(() => gameBoard.markBoard(2, 2, "x")).not.toThrow(
        expectedOutOfBoundsErrorMessage
      );
    });

    test("Retrieves the board marks correctly.", () => {
      gameBoard.markBoard(0, 0, "x");
      gameBoard.markBoard(2, 2, "o");

      expect(gameBoard.getMarker(0, 0)).toBe("x");
      expect(gameBoard.getMarker(2, 2)).toBe("o");
      expect(gameBoard.getMarker(0, 2)).toBe("");
    });

    test("getMarker: Out of bound marks triggers errors.", () => {
      let expectedOutOfBoundsErrorMessage =
        "Location does not exist on the Board.";
      expect(() => gameBoard.getMarker(3, 3)).toThrow(
        expectedOutOfBoundsErrorMessage
      );
    });
  });

  test("Board gets cleared correctly", () => {
    gameBoard.markBoard(0, 0, "x");
    gameBoard.markBoard(1, 1, "o");
    gameBoard.markBoard(2, 2, "x");
    expect(gameBoard.board[0][0]).toBe("x");
    expect(gameBoard.board[1][1]).toBe("o");
    expect(gameBoard.board[2][2]).toBe("x");
    gameBoard.clearBoard();
    expect(gameBoard.board[0][0]).toBe("");
    expect(gameBoard.board[1][1]).toBe("");
    expect(gameBoard.board[2][2]).toBe("");
  });

  describe("Check winner checking logic.", () => {
    test("horizontals", () => {
      gameBoard.markBoard(0, 0, "x");
      gameBoard.markBoard(0, 1, "x");
      gameBoard.markBoard(0, 2, "x");
      gameBoard.markBoard(2, 2, "o");

      expect(gameBoard.checkWinner(0, 0)).toBe("x");
      expect(gameBoard.checkWinner(0, 1)).toBe("x");
      expect(gameBoard.checkWinner(0, 2)).toBe("x");
      expect(gameBoard.checkWinner(1, 0)).toBe("");
      expect(gameBoard.checkWinner(2, 2)).toBe("");
    });

    test("verticals", () => {
      gameBoard.markBoard(0, 0, "x");
      gameBoard.markBoard(1, 0, "x");
      gameBoard.markBoard(2, 0, "x");
      gameBoard.markBoard(2, 2, "o");

      expect(gameBoard.checkWinner(0, 0)).toBe("x");
      expect(gameBoard.checkWinner(1, 0)).toBe("x");
      expect(gameBoard.checkWinner(2, 0)).toBe("x");
      expect(gameBoard.checkWinner(1, 1)).toBe("");
      expect(gameBoard.checkWinner(2, 2)).toBe("");
    });

    test("right diagonal", () => {
      gameBoard.markBoard(1, 1, "x");
      gameBoard.markBoard(0, 2, "x");
      gameBoard.markBoard(2, 0, "x");
      gameBoard.markBoard(2, 2, "o");
      gameBoard.markBoard(0, 0, "x");
      //   0   1   2
      //0 'x' ' ' 'x'
      //1 ' ' 'x' ' '
      //2 'x' ' ' 'o'
      expect(gameBoard.checkWinner(1, 1)).toBe("x");
      expect(gameBoard.checkWinner(0, 2)).toBe("x");
      expect(gameBoard.checkWinner(2, 0)).toBe("x");
      expect(gameBoard.checkWinner(0, 0)).toBe("");
      expect(gameBoard.checkWinner(0, 1)).toBe("");
      expect(gameBoard.checkWinner(2, 2)).toBe("");
    });

    test("right diagonal", () => {
      gameBoard.markBoard(0, 0, "x");
      gameBoard.markBoard(0, 2, "x");
      gameBoard.markBoard(1, 1, "x");
      gameBoard.markBoard(2, 0, "o");
      gameBoard.markBoard(2, 2, "x");
      //   0   1   2
      //0 'x' ' ' 'x'
      //1 ' ' 'x' ' '
      //2 'o' ' ' 'x'
      expect(gameBoard.checkWinner(0, 0)).toBe("x");
      expect(gameBoard.checkWinner(1, 1)).toBe("x");
      expect(gameBoard.checkWinner(2, 2)).toBe("x");
      expect(gameBoard.checkWinner(2, 0)).toBe("");
      expect(gameBoard.checkWinner(0, 2)).toBe("");
      expect(gameBoard.checkWinner(0, 1)).toBe("");
    });

    test("get winner works correctly", () => {
      gameBoard.markBoard(0, 0, "x");
      gameBoard.markBoard(0, 2, "x");
      gameBoard.markBoard(1, 1, "x");
      gameBoard.markBoard(2, 0, "o");
      gameBoard.markBoard(2, 2, "x");
      //   0   1   2
      //0 'x' ' ' 'x'
      //1 ' ' 'x' ' '
      //2 'o' ' ' 'x'
      expect(gameBoard.getWinner()).toBe('x');
    });
  });
});
