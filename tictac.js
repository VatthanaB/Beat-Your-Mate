player1score = 0;
player2score = 0;

// Creating the game create object to store state of the game
// xTurn, a flag to switch between turns
// xState, the state of X, represented with an array of strings
// oState, the state of Y, represented in the same way
// winningStates, the possible combinations to win the game.

const game = {
  xTurn: true,
  xState: [],
  oState: [],
  winningStates: [
    // Rows
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],

    // Columns
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],

    // Diagonal
    ["0", "4", "8"],
    ["2", "4", "6"],
  ],
};
// adding click event listener to the board
document.addEventListener("click", (event) => {
  const target = event.target;
  const isCell = target.classList.contains("grid-cell");
  const isDisabled = target.classList.contains("disabled");

  if (isCell && !isDisabled) {
    // The player clicked on a cell that is still empty
    const cellValue = target.dataset.value;

    // For this, we can use classes to decide if the click event was triggered on the right element.
    // We also want to check if the cell is disabled.
    // If it is, that means we already have a mark in the cell, in which case, we want to do nothing.
    // Essentially, not allow the user to place another mark into the cell.
    game.xTurn === true
      ? game.xState.push(cellValue)
      : game.oState.push(cellValue);

    target.classList.add("disabled");
    target.classList.add(game.xTurn ? "x" : "o");

    game.xTurn = !game.xTurn;
  }
  //   check for draws as that only requires 4 lines of code. Each time we add a mark to a cell, we disable it.
  // This means that if all cells are disabled, then it's a draw
  if (!document.querySelectorAll(".grid-cell:not(.disabled)").length) {
    document.querySelector(".game-over").classList.add("visible");
    document.querySelector(".game-over-text").textContent = "Draw!";
  }
  //   check for wins as that requires a bit more code. We need to check if any of the winning states are present in either the xState or oState arrays.
  game.winningStates.forEach((winningState) => {
    const xWins = winningState.every((state) => game.xState.includes(state));
    const oWins = winningState.every((state) => game.oState.includes(state));

    if (xWins || oWins) {
      document
        .querySelectorAll(".grid-cell")
        .forEach((cell) => cell.classList.add("disabled"));
      document.querySelector(".game-over").classList.add("visible");
      document.querySelector("#game").classList.add("invisible");
      document.querySelector(".game-over-text").textContent = xWins
        ? "X wins!"
        : "O wins!";
    }
    if (xWins) {
      player1score++;
      $(".score").html(`${player1score} - ${player2score}`);
    } else if (oWins) {
      player2score++;
      $(".score").html(`${player1score} - ${player2score}`);
    }
  });
  //   Check to retart the game
  document.querySelector(".restart").addEventListener("click", () => {
    document.querySelector(".game-over").classList.remove("visible");
    document.querySelector("#game").classList.remove("invisible");
    document.querySelectorAll(".grid-cell").forEach((cell) => {
      cell.classList.remove("disabled", "x", "o");
    });

    game.xTurn = true;
    game.xState = [];
    game.oState = [];
  });
});
