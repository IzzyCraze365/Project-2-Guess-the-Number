// Project: Week 2
// Guess the Number - Standard Game
// John Isabella III

const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
const startReverseGame = require("./reverseGame"); // This calls the Reverse Game //TODO I did not get this to work

start(); // This is where all the code is


async function start() {
  let standardOrReverse = await ask(
    `Welcome to the Greatest Game in the Kindergarden Play Yard!!!\nGuess the Number!\n\nWhat kind of a game would you like to play???\nThe Standard Game, where you (human) make up a number and I (computer) try to guess it.\nOr the Reverse Gamewhere I (computer) make up a number and you (human) try to guess it.\n \nIf you want to play the Standard Game type in "STANDARD" or "S"\nIf you want to play the Reverse Game type in "REVERSE" or "R"\n`
  );
  standardOrReverse = capitalizeFirstLetter(standardOrReverse);
  if (standardOrReverse === "Standard" || standardOrReverse === "S") {
    startStandardGame(); // This is where all the code is for the Standard Game
  } else if (standardOrReverse === "Reverse" || standardOrReverse === "R") {
    startReverseGame(); // This is where all the code is for the Reverse Game
  } else {
    notValid(standardOrReverse);
    process.exit();
  }
}


async function startStandardGame() {
  console.log(
    `Welcome to the Greatest Game in the Kindergarden Play Yard!!!\nGuess the Number!\n\nLet's play a game where you (human) make up a number and I (computer) try to guess it.`
  );
  let secretNumber = await ask(
    `What is your "Secret Number"?\n\nI won't peek, I promise...\n(Cross my Harddrive & Hope to Crash...)\n`
  );
  setRangeNumberCheck(secretNumber);
  console.log(
    `\nRemember this number, its your Super-Special-Awesome "Secret Number"\nYou entered: ${secretNumber}\n`
  );

  // Global Variable List (default)
  let max = 100;
  let min = 1;
  let guess = 0;
  let i = 1; // Keeps track of how many times the CPU made a guess
  let prediction = 0; //This is how many guesses the CPU thinks it needs
  let highLow = "A";
  let toInfinityAnd = "START"; // These keeps the While loop running

  min = await setRangeMin(secretNumber); //returns min waits for a user response
  max = await setRangeMax(secretNumber, min); //returns max waits for a user response
  console.log(`Our range has been set from ${min} to ${max}.\n`);
  phraseStart(min, max); // Prints Statement
  prediction = wager(min, max); //Prints Prediction
  console.log(
    `If at any point you want to Quit the game.\nType in "E" or "EXIT"\n`
  );

  while (toInfinityAnd !== "Beyond!!!") {
    guess = cpuGuess(min, max); //return "guess" = number
    let correctNumber = await cpuGuessQuestion(guess, i); //returns "correctNumber" = Y or N
    if (correctNumber === "Y" || correctNumber === "Yes") {
      round2 = await phraseEndOfGame(guess, i, secretNumber); // returns Play or Exit
      nextRound(round2);
    } else if (correctNumber === "N" || correctNumber === "No") {
      i++; //Tracks the number of guesses
      cheating(guess, min, max); //checks for cheating
      highLow = await phraseHighLowQuestion(guess);
      if (highLow === "L" || highLow === "Low" || highLow === "Lower") {
        max = guess; // returns new max
      } else if (
        highLow === "H" ||
        highLow === "High" ||
        highLow === "Higher"
      ) {
        min = guess; // returns new min
      } else if (highLow === "Exit" || highLow === "E") {
        console.log(
          "\nI must have been getting really close if your Quitting now...\nAt least you didn't Cheat like that other Player..."
        );
        quitGame(highLow);
      } else {
        notValid(highLow);
      }
    } else if (correctNumber === "E" || correctNumber === "Exit") {
      console.log("\nHave a numberless Day!\n");
      quitGame(correctNumber);
    } else {
      notValid(correctNumber);
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

// Function to figure out if the Player is Cheating
function cheating(guess, min, max) {
  if (guess == "Exit" || guess == "E") {
    console.log("\nHave a Cheap Day\n\n");
    quitGame(guess);
  } else if (guess === min || guess === max) {
    console.log(
      `\nDid you forget your "Secret Number"?\nI've already guessed "${guess}"\nDo you really want to win that badly that you have to cheat?\nYou're a Cheater!\nPlay Again when you decide to be truthful.\n`
    );
    process.exit();
  } else if (guess <= min) {
    console.log(
      `Your guess of ${guess} is not a valid choice.\nBecause ${guess} is less than ${min}\nPlease choose again, you cheater.\n`
    );
  } else if (guess > max) {
    console.log(
      `Your guess of ${guess} is not a valid choice.\nBecause ${guess} is greater than ${min}\nPlease choose again, you cheater.\n`
    );
  } else {
  }
}

// Function for the CPU to provide an Educated Guess
function cpuGuess(min, max) {
  if (min === max - 1) {
    return max; //otherwise you can never guess the Max number
  } else {
    return Math.floor((max + min) / 2);
  }
}

// Function to say a Phrase Each Round
async function cpuGuessQuestion(guess, i) {
  let correctlyGuessedNumber = await ask(
    `\nIs it... ${guess},\nNumber of Guesses: ${i}\nYes (Y) or No (N)?\n`
  );
  return capitalizeFirstLetter(correctlyGuessedNumber);
}

//Quit the game by typing "Exit"
function quitGame(quit) {
  if (quit === "Exit" || quit === "E");
  process.exit(); // This ends the Game
}

// Function that lets the player decide if they want to play again or quit
function nextRound(round2) {
  if (round2 === ("P" || "Play")) {
    startStandardGame(); // TODO This will have to change for the Merged Game
  } else if (round2 === "E" || round2 === "Exit") {
    quitGame(round2);
  } else {
    notValid(round2);
  }
}

// Response for an Invalid Answer response
function notValid(stoopidAnswer) {
  console.log(`\n${stoopidAnswer} is NOT a valid response.\nTry Again\n`);
}

// Function to say a Phrase when the correct Number is guessed
async function phraseEndOfGame(guess, i, secretNumber, prediction) {
  guess = parseInt(guess); // This turns the string, into a number
  secretNumber = parseInt(secretNumber); // This turns the string, into a number
  if (guess === secretNumber) {
    if (i === 1) {
      console.log(
        `\nYour number is ${guess}!\nFIRST TRY!!!\nI'm a genius, Praise my mighty algorithms.\n(Funny, I'm not hearing any praise...)`
      );
    } else if (i > prediction) {
      console.log(
        `\nSomething is a little fishy here...\nIt should have only taken my ${prediction} guesses to figure out that your Secret Number was ${guess}!\n But it took me ${i} tries instead... \n Check your pants because at some point you were a liar liar!`
      );
    } else {
      console.log(
        `\nYour number is ${guess}!\nI guessed your number after ${i} tries!`
      );
    }
  } else {
    console.log(
      `\nFunny how it only took me ${i} tries to guess ${guess}\nWhich is not the same as the "Secret Number" you gave me at the beginnning which was ${secretNumber}\nI'm not one to point fingers or name names\nBut someone here is a dirty rotten CHEATER!!!!\nAND IT ISN'T ME!!!\n(I'm just a simple computer program)\n`
    );
  }
  let playAgain = await ask(
    `\nWould you like to play again?\nPlay (P) or Exit (E)?\n`
  );
  return capitalizeFirstLetter(playAgain);
}

// Function to say a Phrase Each Round
async function phraseHighLowQuestion(guess) {
  let gettingWarmer = await ask(
    `\nIs your number higher (H) or lower (L) than ${guess}?\n`
  );
  return capitalizeFirstLetter(gettingWarmer);
}

// Function to say a Phrase at the start of the Game
function phraseStart(min, max) {
  console.log(
    `\nPlease think of a number between ${min} and ${max} (inclusive).\nI will try to guess it.\n`
  );
}

// Function for Player to set the top of the Range
async function setRangeMax(secretNumber, min) {
  let rangeMax = await ask(
    `\nWhat would you like the largest number in our game to be?\n(If your not sure I recommend using the number 100)\n`
  );
  rangeMax = parseInt(rangeMax); // This turns the string, into a number
  rangeMax = setRangeNumberCheck(rangeMax);
  if (rangeMax >= secretNumber) {
    if (rangeMax > min) {
      return rangeMax;
    } else {
      console.log(
        `\nSorry, but you need to choose a number that is greater than ${min}\nPlease start the game again.\n\n`
      );
      process.exit();
    }
  } else {
    console.log(
      `\nWow, your cheating already...\nYour "Secret Number" (remember its ${secretNumber}) cannot be higher than the top of your range (${rangeMax})\nRestaring the Game for you... \nYou CHEATER!!!\n\n`
    );
    process.exit();
  }
}

// Function for Player to set the bottom of the Range
async function setRangeMin(secretNumber) {
  let rangeMin = await ask(
    `First we need to set the Range of Numbers for our game.\nWhat would you like the smallest number in our game to be?\n(If your not sure I recommend using the number 1)\n`
  );
  rangeMin = setRangeNumberCheck(rangeMin);
  rangeMin = parseInt(rangeMin); // This turns the string, into a number
  if (rangeMin <= secretNumber) {
    return rangeMin;
  } else {
    console.log(
      `\nWow, your cheating already...\nYour "secret number" (remember its ${secretNumber}) cannot be lower than the bottom of your range (${rangeMin})\nRestarting the Game for you...\nYou CHEATER!!!\n\n`
    );
    process.exit();
  }
}

// Function that Verifies that the input is a Number
function setRangeNumberCheck(notANumber) {
  if (isNaN(notANumber) === false) {
    return notANumber;
  } else if (notANumber === "Exit" || notANumber === "E") {
    quitGame(notANumber);
  } else {
    console.log(
      `\nNice try\n"${notANumber}" is NOT a number...\nRestart the game\nAnd trying using Real Numbers next time\n`
    );
    process.exit();
  }
}

// Function calculates how many guesses it needs to figure out the Secret Number
function wager(min, max) {
  let yogiBear = Math.floor(Math.log2(max - min) + 1);
  console.log(
    `I will be able to figure out your "Secret Number" in ${yogiBear} guesses.\nBecause I am smarter than the average bear.\n`
  );
  return yogiBear;
}
