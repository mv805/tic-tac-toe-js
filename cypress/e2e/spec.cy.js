describe("Game can be played correctly.", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("Board is rendered", () => {
    cy.get('[data-cy="game-status-field"]').should("exist");
    cy.get('[data-cy="x-win-count"]').should("exist");
    cy.get('[data-cy="o-win-count"]').should("exist");
    cy.get('[data-cy="game-board"]').should("exist");
    cy.get('[data-cy="new-game-button"]').should("exist");

  });

  it("Can mark a cell", () => {
    cy.get('[data-cy="cell-0-2"]').click();
    cy.get('[data-cy="cell-0-2"]').should("contain", "x");
  });

  it("Can reset the game mid-game", () => {
    cy.get('[data-cy="cell-0-2"]').click();
    cy.get('[data-cy="cell-0-2"]').should("contain", "x");

    cy.get('[data-cy="cell-2-2"]').click();
    cy.get('[data-cy="cell-2-2"]').should("contain", "o");

    cy.get('[data-cy="cell-0-1"]').click();
    cy.get('[data-cy="cell-0-1"]').should("contain", "x");

    cy.get('[data-cy="new-game-button"]').click();
    cy.get('[data-cy="cell-0-2"]').should("not.have.text");
    cy.get('[data-cy="cell-2-2"]').should("not.have.text");
    cy.get('[data-cy="cell-0-1"]').should("not.have.text");
  });

  it("Can register an x player win and reset", () => {
    cy.get('[data-cy="cell-0-2"]').click();
    cy.get('[data-cy="cell-0-2"]').should("contain", "x");

    cy.get('[data-cy="cell-2-2"]').click();
    cy.get('[data-cy="cell-2-2"]').should("contain", "o");

    cy.get('[data-cy="cell-0-1"]').click();
    cy.get('[data-cy="cell-0-1"]').should("contain", "x");

    cy.get('[data-cy="cell-1-1"]').click();
    cy.get('[data-cy="cell-1-1"]').should("contain", "o");

    //status field has default text
    cy.get('[data-cy="game-status-field"]').should("contain", "X goes first.");

    cy.get('[data-cy="cell-0-0"]').click();
    cy.get('[data-cy="cell-0-0"]').should("contain", "x");

    //score is showing correct for x
    cy.get('[data-cy="x-win-count"]').should("contain", "1");

    //...and no score for o
    cy.get('[data-cy="o-win-count"]').should("contain", "0");

    //and win cells are highlighted
    cy.get('[data-cy="cell-0-2"]').should(
      "have.class",
      "game-board__cell--highlighted"
    );

    cy.get('[data-cy="cell-0-1"]').should(
      "have.class",
      "game-board__cell--highlighted"
    );
    cy.get('[data-cy="cell-0-0"]').should(
      "have.class",
      "game-board__cell--highlighted"
    );

    //and board is cleared
    cy.get('[data-cy="new-game-button"]').click();
    cy.get('[data-cy="cell-0-2"]').should('not.have.text');
    cy.get('[data-cy="cell-2-2"]').should("not.have.text");
    cy.get('[data-cy="cell-0-1"]').should("not.have.text");
    cy.get('[data-cy="cell-1-1"]').should("not.have.text");

    //status field is reset
    cy.get('[data-cy="game-status-field"]').should("contain", "X goes first.");

    //score persists
    cy.get('[data-cy="x-win-count"]').should("contain", "1");
    cy.get('[data-cy="o-win-count"]').should("contain", "0");
  });
});
