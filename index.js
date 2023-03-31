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
  console.log("You entered: " + secretNumber);
  // Now try and complete the program.

  //! Global Variable List (before change)
  let max = 100;
  let min = 1;
  let guess = 0;
  let i = 0;
  let userInput = "START-GAME"; // Cannot get this variable in normal ways

  // TODO here is where the most of the code should go

while (userInput === "START-GAME") {
    phraseSetRange();
    min = await setRangeMin(); //returns min waits for a user response
    max = await setRangeMax(min); //returns max waits for a user response
    console.log(`Our range has been set from ${min} to ${max}.`);
    phraseStart(min,max); // Prints Statement
    userInput = "A";
    console.log("userInput =", userInput, "Guess=",guess, "Min =", min, "Max =", max,); //!TEST
  }

  while (userInput !== "EXIT") {
    console.log("userInput =", userInput, "Guess=",guess, "Min =", min, "Max =", max,); //!TEST
    while (userInput !== ("Y" || "Yes")) {
      guess = cpuGuess(min, max); //return "guess" = number
      userInput = await cpuGuessQuestion(guess); //returns "userInput" = Y or N
      if (userInput === ("Y" || "Yes")) {
       userInput = phraseEndOfGame(guess); // returns Yes of No
        if (userInput === ("Y" || "Yes")) {
          min = 1;
          max = 100;
          guess = 0;
          i = 0;
          userInput = "START-GAME";
        } else {
          console.log("Have a Nice Day!");
          userInput = "EXIT";
          break;
        }
      } else if (userInput === ("N" || "No")) {
        userInput = await phraseHighLowQuestion();
        if (userInput === ("L" || "Low"|| "Lower")) {
          max = guess; // returns new max
        } else if (userInput === ("H" || "High" || "Higher")) {
          min = guess; // returns new min
        } else {
          cheating(guess, min, max);
        }
      } else {
        notValid(userInput);
      }
    }
  }
}

//! Function List (Alphabetical Order)

// Function to fix userInput
function allCaps(userInput) {
  return userInput.toUpperCase().trim();
}
/* 
let letter= "      x";
console.log("Function allCaps test",allCaps(letter)); //! TEST
 */

//Capitolizes the Player's Name
function firstLetterCaps(name) {
  let firstLetter1 = name.charAt(0).toUpperCase();
  let restOfWord1 = name.slice(1).toLowerCase();
  return firstLetter1 + restOfWord1;
}
//console.log(firstLetterCaps("yes")); // TEST

// Function to figure out
function cheating(guess,min,max) {
  if(guess === (min||max)){
    console.log(`Your "${guess}" is correct but I broke on the inside.`);  
  }else if(guess <= min){
  console.log(`Your guess of ${guess} is not a valid choice. \n Because ${guess} is less than ${min} \nPlease choose again, you cheater.`);
  }else if( guess > max){
    console.log(`Your guess of ${guess} is not a valid choice. \n Because ${guess} is greater than ${min} \nPlease choose again, you cheater.`);
  }else{
      console.log("ERROR CODE BROKEN");
    }
  }

// Function for the CPU to provide a Guess
function cpuGuess(min, max) {
  if (min === max - 1) {
    return max; //otherwise you can never guess the Max number
  } else {
    return Math.floor((max + min) / 2);
  }
}
/* 
let userInput = "HELLO THERE"
let guess = 0;
let min = 2;
let max = 102;
console.log("userInput =", userInput, "Guess=",guess, "Min =", min, "Max =", max,); //!TEST
guess = cpuGuess(min, max); //return "guess" = number
console.log("userInput =", userInput, "Guess=",guess, "Min =", min, "Max =", max,); //!TEST
userInput = await cpuGuessQuestion(guess); //returns "userInput" = Y or N
 */

// Function to say a Phrase Each Round
async function cpuGuessQuestion(guess) {
  let userInput = await ask(`Is it... ${guess}, \n Yes (Y) or No (N)?`);
  return firstLetterCaps(userInput);
}


function notValid(userInput){
  console.log(`"${userInput}" is NOT a valid response. \n Try Again`);
}


// Function to say a Phrase at the when you guess the correct Number
async function phraseEndOfGame(guess) {
  console.log(`Your number is ${guess}!`);
  let userInput = await ask(
    `Would you like to play again? \n Yes (Y) or No (N)?`
  );
  return firstLetterCaps(userInput);
}
//phraseEndOfGame(66); //! Test Print of Phrase


// Function to say a Phrase Each Round
async function phraseHighLowQuestion() {
  let userInput = await ask("Is it higher (H), or lower (L)? \n");
  return userInput
}
//phraseHighLowQuestion(); //! Test Print of Phrase

// Function to say a Phrase at the start of the Game
function phraseStart(min,max) {
  console.log(
    `Please think of a number between ${min} and ${max} (inclusive). \n I will try to guess it.`
  );
}
//phraseStart(); //! Test Print of Phrase


function phraseSetRange() {
  console.log("First we need to set the Range of Numbers for our game.\n");
}


// Function for Player to tell the Range
async function setRangeMax(min) {
let rangeMax = await ask(" What would you like the largest number in our game to be? \n If your not sure I recommend using the number 100 \n");
  if(rangeMax > min === true){
  return rangeMax;
  }else{
    console.log(`Sorry, but you need to choose a number that is greater than ${min} \n Please start the game again.`);
  }
}

async function setRangeMin() {
  let rangeMin = await ask("What would you like the smallest number in our game to be? \n If your not sure I recommend using the number 1 \n");
  return rangeMin;
}
