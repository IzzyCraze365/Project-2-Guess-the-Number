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
  console.log(`You entered: ${secretNumber} \n`);
  // Now try and complete the program.

  //! Global Variable List (before change)
  let max = 100;
  let min = 1;
  let guess = 0;
  let i = 0;
  let userInput = "START-GAME"; // Cannot get this variable in normal ways
  let highLow = "A";
  let playAgain = "START"

  // TODO here is where the most of the code should go

  while (userInput === "START-GAME") {
    //phraseSetRange();
    min = await setRangeMin(); //returns min waits for a user response
    max = await setRangeMax(min); //returns max waits for a user response
    console.log(`Our range has been set from ${min} to ${max}.`);
    phraseStart(min, max); // Prints Statement
    userInput = "A";
    console.log(   "TEST 1 userInput =", userInput,"Guess=",guess,"Min =",min,"Max =", max); //!TEST
  }

  while (userInput !== "Exit") {
    while (playAgain !== ("E" || "Exit")) {
      guess = cpuGuess(min, max); //return "guess" = number
      let correctNumber = await cpuGuessQuestion(guess); //returns "correctNumber" = Y or N
      if (correctNumber === ("Y" || "Yes")) {
        round2 = phraseEndOfGame(guess); // returns Yes of No
        if (round2 === ("P" || "Play")) {
          min = 1;
          max = 100;
          guess = 0;
          i = 0;
          userInput = "START-GAME";
        } else if (round2 === ("E" || "Exit")) {
          console.log("Have a Nice Day!");
          userInput = "Exit";
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
          console.log("Have a Bad Day!");
          userInput = "Exit";
        } else {
          cheating(guess, min, max);
        }
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
//console.log(capitalizeFirstLetter("   yes")); //! TEST

// Function to figure out
function cheating(guess, min, max) {
  if (guess == "Exit") {
    console.log("Have a Nice Day");
  } else if (guess === (min || max)) {
    console.log(`Your "${guess}" is correct but I broke on the inside.`);
  } else if (guess <= min) {
    console.log(
      `Your guess of ${guess} is not a valid choice. \n Because ${guess} is less than ${min} \nPlease choose again, you cheater.`
    );
  } else if (guess > max) {
    console.log(
      `Your guess of ${guess} is not a valid choice. \n Because ${guess} is greater than ${min} \nPlease choose again, you cheater.`
    );
  } else {
    console.log("ERROR CODE BROKEN");
  }
}

// Function for the CPU to provide a Guess
function cpuGuess(min, max) {
  if (min === max - 1) {
    console.log("Test zone 3.5");
    return max; //otherwise you can never guess the Max number
  } else {
    console.log("Test zone 3.9");
    console.log("Initial Guess", Math.floor((max + min) / 2));
    return Math.floor((max + min) / 2);
  }
}

// Function to say a Phrase Each Round
async function cpuGuessQuestion(guess) {
  let correctlyGuessedNumber = await ask(
    `Is it... ${guess}, \n Yes (Y) or No (N)?\n`
  );
  return capitalizeFirstLetter(correctlyGuessedNumber);
}

function notValid(stoopidAnswer) {
  console.log(`"${stoopidAnswer}" is NOT a valid response. \n Try Again\n`);
}

// Function to say a Phrase at the when you guess the correct Number
async function phraseEndOfGame(guess) {
  console.log(`Your number is ${guess}!`);
  let playAgain = await ask(
    `Would you like to play again? \n Play (P) or Exit (E)?\n`
  );
  return capitalizeFirstLetter(playAgain);
}

// Function to say a Phrase Each Round
async function phraseHighLowQuestion(guess) {
  let userInput = await ask(
    `Is your number higher (H) or lower (L) than ${guess}? \n`
  );
  return capitalizeFirstLetter(userInput);
}

// Function to say a Phrase at the start of the Game
function phraseStart(min, max) {
  console.log(
    `Please think of a number between ${min} and ${max} (inclusive). \n I will try to guess it.\n`
  );
}

// Function for Player to tell the Range
async function setRangeMax(min) {
  let rangeMax = await ask(
    " What would you like the largest number in our game to be? \n (If your not sure I recommend using the number 100) \n"
  );
  if (rangeMax > min) {
    rangeMax = parseInt(rangeMax); // This turns the string, into a number
    return rangeMax;
  } else {
    console.log(
      `Sorry, but you need to choose a number that is greater than ${min} \n Please start the game again.`
    );
  }
}

async function setRangeMin() {
  let rangeMin = await ask(
    "First we need to set the Range of Numbers for our game.\n What would you like the smallest number in our game to be? \n (If your not sure I recommend using the number 1) \n"
  );
  rangeMin = parseInt(rangeMin); // This turns the string, into a number
  return rangeMin;
}

function setRangeNumberCheck(notANumber){
  if((typeof(notANumber)) == Number){
    return notANumber;
  }else{
    console.log(`Nice try \n ${notANumber} is NOT a number...`);
  }
}
setRangeNumberCheck(55);

notANumber = 55;
console.log( typeof(notANumber));
console.log( typeof(notANumber) == Number);