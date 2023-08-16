// Player Scores
let player1score = 0;
let player2score = 0;

//  Rock paper scissors variables + array
const rock = `<i id="rock" class="fa-regular fa-hand-back-fist fa-2xl"></i>`;
const paper = `<i id="paper" class="fa-regular fa-hand fa-2xl"></i>`;
const scissors = `<i id="scissors" class="fa-regular fa-hand-scissors fa-2xl"></i>`;
const choices = [rock, paper, scissors]; // Array of choices

// Start button click event listener / Load the page before starting the game (listning) 🦄
$(document).ready(function () {
  // START ROCK PAPER SCISSORS GAME 🦄
  $("#start-button-rps").click(function () {
    //  create a random number between 0 and 2
    const player1random = Math.floor(Math.random() * 3);
    console.log(player1random);
    const player2random = Math.floor(Math.random() * 3);
    console.log(player2random);

    // use the random number to select a choice from the array
    const player1choice = choices[player1random];
    const player2choice = choices[player2random];

    // display the choice on the screen
    $("#player1-icon").html(player1choice);
    $("#player2-icon").html(player2choice);

    // compare the choices and display the winner
    if (player1random === player2random) {
      // document.getElementById("title").innerHTML = "Tie";  DOM VERSION EXEMPLE
      $("#title").html("Tie"); //  replace the text of "Rock Paper Scissors" with "Tie"
    } else if (
      (player1random === 0 && player2random === 2) ||
      (player1random === 1 && player2random === 0) ||
      (player1random === 2 && player2random === 1)
    ) {
      $("#title").html("🚩 Player 1 Wins"); //  replace the text of "Rock Paper Scissors" with "Player 1 Wins"

      player1score++; // increase the score of player 1
    } else {
      $("#title").html("Player 2 Wins 🚩"); //  replace the text of "Rock Paper Scissors" with "Player 2 Wins"

      player2score++; // increase the score of player 2
    }

    $(".score").html(`${player1score} - ${player2score}`);
    // document.getElementById("score").innerHTML = `${player1score} - ${player2score}`;  DOM VERSION EXEMPLE

    // display the score
  });
  // END OF ROCK PAPER SCISSORS GAME 🧙‍♂️

  //   START DICE GAME 🦄
  $("#start-button-dice").click(function () {
    // Player 1 Part
    let randomNumber1 = Math.floor(Math.random() * 6) + 1; //1-6

    let randomDiceImage = "dice" + randomNumber1 + ".png"; //dice1.png - dice6.png

    let randomImageSource = "images/" + randomDiceImage; //images/dice1.png - images/dice6.png

    let image1 = document.querySelectorAll("img")[0];

    image1.setAttribute("src", randomImageSource);

    //  Player 2 part
    let randomNumber2 = Math.floor(Math.random() * 6) + 1;

    let randomImageSource2 = "images/dice" + randomNumber2 + ".png";

    document.querySelectorAll("img")[1].setAttribute("src", randomImageSource2);

    // Compare the numbers and display the winner

    if (randomNumber1 > randomNumber2) {
      player1score++;
      $("#title").html("🚩 Player 1 Wins");
    } else if (randomNumber2 > randomNumber1) {
      player2score++;
      $("#title").html("Player 2 Wins 🚩");
    } else {
      $("#title").html("Tie");
    }
    $(".score").html(`${player1score} - ${player2score}`);
  });
  // END OF DICE GAME 🧙‍♂️

  // START COIN FLIP GAME 🦄

  // Check game if player choose head
  $("#start-button-coin-head").on("click", function () {
    // 1. Generate a random number between 0 and 1
    var flipResult = Math.random();
    // 2. Display the result of the coin flip in the DOM
    $("#coin").removeClass();
    // 3. Set a timeout function to delay the addition of the classes
    setTimeout(function () {
      // check if the flip result is less than or equal to 0.5 (heads) + add score to player 1
      if (flipResult <= 0.5) {
        $("#coin").addClass("heads");
        player1score++;
        $(".score").html(`${player1score} - ${player2score}`);

        console.log("it is head");
      }
      // otherwise, it is tails + add score to player 2
      else {
        $("#coin").addClass("tails");
        player2score++;
        $(".score").html(`${player1score} - ${player2score}`);
        console.log("it is tails");
      }
    }, 100);
  });
  // Check game if player choose tail logic is same as above
  $("#start-button-coin-tail").on("click", function () {
    var flipResult = Math.random();
    $("#coin").removeClass();
    setTimeout(function () {
      if (flipResult <= 0.5) {
        $("#coin").addClass("heads");
        player2score++;
        $(".score").html(`${player1score} - ${player2score}`);

        console.log("it is head");
      } else {
        $("#coin").addClass("tails");
        player1score++;
        $(".score").html(`${player1score} - ${player2score}`);
        console.log("it is tails");
      }
    }, 100);
  });
  // END OF COIN FLIP GAME 🧙‍♂️
});

