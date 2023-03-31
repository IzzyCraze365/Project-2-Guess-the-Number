// Project: Week 2
// Guess the Number
// John Isabella III

const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promised...\n"
  );
  console.log(`You entered: ${secretNumber}\n`);
  // Now try and complete the program.

  //! Global Variable List (before change)
  let max = 100;
  let min = 1;
  let guess = 0;
  let i = 0;
  let userInput = "START-GAME"; // Cannot get this variable in normal ways
  let highLow = "A";
  let playAgain = "START"
  console.log(secretNumber);
  // TODO here is where the most of the code should go

  while (userInput === "START-GAME") {
    //phraseSetRange();
    min = await setRangeMin(secretNumber); //returns min waits for a user response
    max = await setRangeMax(secretNumber, min); //returns max waits for a user response
    console.log(`Our range has been set from ${min} to ${max}.\n`);
    phraseStart(min, max); // Prints Statement
    userInput = "A";
    console.log(secretNumber);
  }

  while (userInput !== "Exit") {
    while (playAgain !== ("E" || "Exit")) {
      guess = cpuGuess(min, max); //return "guess" = number
      let correctNumber = await cpuGuessQuestion(guess); //returns "correctNumber" = Y or N
      if (correctNumber === ("Y" || "Yes")) {
        round2 = await phraseEndOfGame(guess); // returns Play or Exit
        if (round2 === ("P" || "Play")) {
          min = 1;
          max = 100;
          guess = 0;
          i = 0;
          userInput = "START-GAME";
        } else if (round2 === ("E" || "Exit")) {
          console.log("\nHave a Nice Day!\n\n");
          userInput = "Exit";
          process.exit(); // This should end the game
        } else {
          notValid(round2);
        }
      } else if (correctNumber === ("N" || "No")) {
        highLow = await phraseHighLowQuestion(guess);
        if (highLow === ("L" || "Low" || "Lower")) {
          max = guess; // returns new max
        } else if (highLow === ("H" || "High" || "Higher")) {
          min = guess; // returns new min
        } else if (highLow === "Exit") {
          console.log("\nHave a Bad Day!");
          userInput = "Exit";
          process.exit(); // This should end the game
        } else {
          cheating(guess, min, max);
        }
      } else if (correctNumber === ("E" || "Exit")) {
        console.log("Have a numberless Day!");
        process.exit();// This should end the game
      } else {
        notValid(highLow);
      }
    }
  }
}

//! Function List (Alphabetical Order)

//Capitolizes the Player's Input
function capitalizeFirstLetter(name) {
  name = name.trim();
  let firstLetter1 = name.charAt(0).toUpperCase();
  let restOfWord1 = name.slice(1).toLowerCase();
  return firstLetter1 + restOfWord1;
}


// Function to figure out
function cheating(guess, min, max) {
  if (guess == "Exit") {
    console.log("\nHave a Cheap Day\n\n");
    process.exit();
  } else if (guess === (min || max)) {
    console.log(`Your "${guess}" is correct but I broke on the inside.\n`);
  } else if (guess <= min) {
    console.log(
      `Your guess of ${guess} is not a valid choice.\nBecause ${guess} is less than ${min}\nPlease choose again, you cheater.\n`
    );
  } else if (guess > max) {
    console.log(
      `Your guess of ${guess} is not a valid choice.\nBecause ${guess} is greater than ${min}\nPlease choose again, you cheater.\n`
    );
  } else {
    console.log("ERROR CODE BROKEN");
  }
}

// Function for the CPU to provide a Guess
function cpuGuess(min, max) {
  if (min === max - 1) {
    return max; //otherwise you can never guess the Max number
  } else {
    console.log("Initial Guess", Math.floor((max + min) / 2));
    return Math.floor((max + min) / 2);
  }
}

// Function to say a Phrase Each Round
async function cpuGuessQuestion(guess) {
  let correctlyGuessedNumber = await ask(
    `Is it... ${guess},\nYes (Y) or No (N)?\n`
  );
  return capitalizeFirstLetter(correctlyGuessedNumber);
}

function notValid(stoopidAnswer) {
  console.log(`${stoopidAnswer} is NOT a valid response.\nTry Again\n`);
}

// Function to say a Phrase at the when you guess the correct Number
async function phraseEndOfGame(guess) {
  console.log(`\nYour number is ${guess}!`);
  let playAgain = await ask(
    `\nWould you like to play again?\nPlay (P) or Exit (E)?\n`
  );
  return capitalizeFirstLetter(playAgain);
}

// Function to say a Phrase Each Round
async function phraseHighLowQuestion(guess) {
  let userInput = await ask(
    `\nIs your number higher (H) or lower (L) than ${guess}?\n`
  );
  return capitalizeFirstLetter(userInput);
}

// Function to say a Phrase at the start of the Game
function phraseStart(min, max) {
  console.log(
    `Please think of a number between ${min} and ${max} (inclusive).\nI will try to guess it.\n`
  );
}


// Function for Player to tell the Range
async function setRangeMax(secretNumber, min) {
  let rangeMax = await ask(
    " What would you like the largest number in our game to be?\n(If your not sure I recommend using the number 100)\n");
  rangeMax = parseInt(rangeMax); // This turns the string, into a number
  if (rangeMax >= secretNumber) {
    if (rangeMax > min) {
      rangeMax = setRangeNumberCheck(rangeMax);
      return rangeMax;
    } else {
      rangeMax = setRangeNumberCheck(rangeMax);
      console.log(`Sorry, but you need to choose a number that is greater than ${min}\nPlease start the game again.\n\n`);
      process.exit();
    }
  } else {
    console.log(`Wow, your cheating already...\nYour secret number (${secretNumber}) cannot be more than the top of your range (${rangeMax})\nRestart the Game... you CHEATER!!!\n\n`);
    process.exit();
  }
}


async function setRangeMin(secretNumber) {
  let rangeMin = await ask(
    `First we need to set the Range of Numbers for our game.\nWhat would you like the smallest number in our game to be?\n(If your not sure I recommend using the number 1)\n`
  );
  rangeMin = parseInt(rangeMin); // This turns the string, into a number
  if (rangeMin <= secretNumber) {
    rangeMin = setRangeNumberCheck(rangeMin);
    return rangeMin;
  } else {
    console.log(`Wow, your cheating already...\nYour secret number (${secretNumber}) cannot be less than the bottom of your range (${rangeMin})\nRestart the Game... you CHEATER!!!\n\n`);
    process.exit();
  }
}

function setRangeNumberCheck(notANumber) {
  if ((isNaN(notANumber)) === false) {
    return notANumber;
  } else {
    console.log(`Nice try\n${notANumber} is NOT a number...\n`);
  }
}