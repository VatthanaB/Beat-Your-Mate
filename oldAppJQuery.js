// Player Scores
let player1score = 0;
let player2score = 0;

// Rock paper scissors variables + array
const rock = `<i id="rock" class="fa-regular fa-hand-back-fist fa-2xl"></i>`;
const paper = `<i id="paper" class="fa-regular fa-hand fa-2xl"></i>`;
const scissors = `<i id="scissors" class="fa-regular fa-hand-scissors fa-2xl"></i>`;
const choices = [rock, paper, scissors]; // Array of choices

// Start button click event listener / Load the page before starting the game
$(document).ready(function () {
  // Start Rock Paper Scissors game
  $("#start-button-rps").click(function () {
    // Create a random number between 0 and 2
    const player1random = Math.floor(Math.random() * 3);
    const player2random = Math.floor(Math.random() * 3);

    // Use the random number to select a choice from the array
    const player1choice = choices[player1random];
    const player2choice = choices[player2random];

    // Display the choice on the screen
    $("#player1-icon").html(player1choice);
    $("#player2-icon").html(player2choice);

    // Compare the choices and display the winner
    if (player1random === player2random) {
      $("#title").html("Tie"); // Replace the text of "Rock Paper Scissors" with "Tie"
    } else if (
      (player1random === 0 && player2random === 2) ||
      (player1random === 1 && player2random === 0) ||
      (player1random === 2 && player2random === 1)
    ) {
      player1score++; // Increase the score of player 1
    } else {
      player2score++; // Increase the score of player 2
    }

    $(".score").html(`${player1score} - ${player2score}`); // Display the score
  });

  // Start Dice game
  $("#start-button-dice").click(function () {
    // Player 1 Part
    const randomNumber1 = Math.floor(Math.random() * 6) + 1; // 1-6
    const randomImageSource = "images/dice" + randomNumber1 + ".png"; // images/dice1.png - images/dice6.png
    $("img")[0].setAttribute("src", randomImageSource);

    // Player 2 part
    const randomNumber2 = Math.floor(Math.random() * 6) + 1;
    const randomImageSource2 = "images/dice" + randomNumber2 + ".png";
    $("img")[1].setAttribute("src", randomImageSource2);

    // Compare the numbers and display the winner
    if (randomNumber1 > randomNumber2) {
      player1score++;
    } else if (randomNumber2 > randomNumber1) {
      player2score++;
    } else {
    }
    $(".score").html(`${player1score} - ${player2score}`); // Display the score
  });

  // Start Coin Flip game
  $("#start-button-coin-head, #start-button-coin-tail").on(
    "click",
    function () {
      // Generate a random number between 0 and 1
      var flipResult = Math.random();
      $("#coin").removeClass();
      setTimeout(function () {
        // Check if the flip result is less than or equal to 0.5 (heads) + add score to player 1
        if (flipResult <= 0.5) {
          $("#coin").addClass("heads");
          if ($(this).attr("id") === "start-button-coin-head") {
            player1score++;
          } else {
            player2score++;
          }
        }
        // Otherwise, it is tails + add score to player 2
        else {
          $("#coin").addClass("tails");
          if ($(this).attr("id") === "start-button-coin-head") {
            player2score++;
          } else {
            player1score++;
          }
        }
        $(".score").html(`${player1score} - ${player2score}`); // Display the score
      }, 100);
    }
  );
});

// Tic Tac Toe

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
    document.querySelector("#game").classList.add("invisible");
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

// for (let i = 0; i < 9; i++) {
//   $(".grid").append(`<div class="grid-cell" data-value="${i}"></div>`);
// }
