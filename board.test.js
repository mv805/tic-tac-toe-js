const Board = require("./src/Board.js");

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
      const testWinningPosition = [
        [0, 0],
        [0, 1],
        [0, 2],
      ];

      gameBoard.markBoard(0, 0, "x");
      gameBoard.markBoard(0, 1, "x");
      gameBoard.markBoard(0, 2, "x");
      gameBoard.markBoard(2, 2, "o");

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(0, 0)
        )
      ).toEqual(true);

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(0, 1)
        )
      ).toEqual(true);

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(0, 2)
        )
      ).toEqual(true);

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(2, 2)
        )
      ).toEqual(false);

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(1, 1)
        )
      ).toEqual(false);

      expect(gameBoard.getWinningPositions(2, 2)).toEqual([]);
      expect(gameBoard.getWinningPositions(1, 2)).toEqual([]);
    });

    test("verticals", () => {
      const testWinningPosition = [
        [0, 0],
        [1, 0],
        [2, 0],
      ];

      gameBoard.markBoard(0, 0, "x");
      gameBoard.markBoard(1, 0, "x");
      gameBoard.markBoard(2, 0, "x");
      gameBoard.markBoard(2, 2, "o");

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(0, 0)
        )
      ).toEqual(true);

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(1, 0)
        )
      ).toEqual(true);

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(2, 0)
        )
      ).toEqual(true);

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(2, 2)
        )
      ).toEqual(false);

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(1, 1)
        )
      ).toEqual(false);

      expect(gameBoard.getWinningPositions(2, 2)).toEqual([]);
      expect(gameBoard.getWinningPositions(1, 1)).toEqual([]);
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
      const testWinningPosition = [
        [1, 1],
        [0, 2],
        [2, 0],
      ];

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(1, 1)
        )
      ).toEqual(true);

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(0, 2)
        )
      ).toEqual(true);

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(2, 0)
        )
      ).toEqual(true);

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(2, 2)
        )
      ).toEqual(false);

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(0, 0)
        )
      ).toEqual(false);

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(1, 0)
        )
      ).toEqual(false);

      expect(gameBoard.getWinningPositions(2, 2)).toEqual([]);
      expect(gameBoard.getWinningPositions(0, 0)).toEqual([]);
      expect(gameBoard.getWinningPositions(1, 0)).toEqual([]);
    });

    test("left diagonal", () => {
      gameBoard.markBoard(0, 0, "x");
      gameBoard.markBoard(0, 2, "x");
      gameBoard.markBoard(1, 1, "x");
      gameBoard.markBoard(2, 0, "o");
      gameBoard.markBoard(2, 2, "x");
      //   0   1   2
      //0 'x' ' ' 'x'
      //1 ' ' 'x' ' '
      //2 'o' ' ' 'x'
      const testWinningPosition = [
        [0, 0],
        [1, 1],
        [2, 2],
      ];

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(0, 0)
        )
      ).toEqual(true);

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(1, 1)
        )
      ).toEqual(true);

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(2, 2)
        )
      ).toEqual(true);

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(0, 2)
        )
      ).toEqual(false);

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(2, 0)
        )
      ).toEqual(false);

      expect(
        compareCoordinateArrays(
          testWinningPosition,
          gameBoard.getWinningPositions(2, 1)
        )
      ).toEqual(false);

      expect(gameBoard.getWinningPositions(0, 2)).toEqual([]);
      expect(gameBoard.getWinningPositions(2, 0)).toEqual([]);
      expect(gameBoard.getWinningPositions(2, 1)).toEqual([]);
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
      expect(gameBoard.getWinningMarker()).toBe("x");
      gameBoard.clearBoard();
      expect(gameBoard.getWinningMarker()).toBe("");
    });
  });
});

/**
 * Compares two arrays of coordinates, checking if they match regardless of order.
 * @param {Array<Array<number>>} arr1 - The first array of coordinates to compare.
 * @param {Array<Array<number>>} arr2 - The second array of coordinates to compare.
 * @returns {boolean} True if the arrays match regardless of order, otherwise false.
 */
function compareCoordinateArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const set1 = new Set(arr1.map(JSON.stringify));
  const set2 = new Set(arr2.map(JSON.stringify));

  // Check if both sets have the same size (i.e., all elements are present in both)
  if (set1.size !== set2.size) {
    return false;
  }

  // Check if every element in set1 is present in set2
  for (let elem of set1) {
    if (!set2.has(elem)) {
      return false;
    }
  }

  return true;
}
