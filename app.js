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
