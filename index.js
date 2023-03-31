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

  // TODO here is where the most of the code should go

while (userInput === "START-GAME") {
    //phraseSetRange();
    min = await setRangeMin(); //returns min waits for a user response
    max = await setRangeMax(min); //returns max waits for a user response
    console.log(`Our range has been set from ${min} to ${max}.`);
    phraseStart(min,max); // Prints Statement
    userInput = "A";
    console.log("TEST 1 userInput =", userInput, "Guess=",guess, "Min =", min, "Max =", max,); //!TEST
  }

  while (userInput !== "Exit") {
    console.log("TEST 2 userInput =", userInput, "Guess=",guess, "Min =", min, "Max =", max,); //!TEST
    while (userInput !== ("Y" || "Yes")) {
      guess = cpuGuess(min, max); //return "guess" = number
      console.log("TEST 3 userInput =", userInput, "Guess=",guess, "Min =", min, "Max =", max,); //!TEST
      userInput = await cpuGuessQuestion(guess); //returns "userInput" = Y or N
      console.log("TEST 4 userInput =", userInput, "Guess=",guess, "Min =", min, "Max =", max,); //!TEST
      if (userInput === ("Y" || "Yes")) {
       userInput = phraseEndOfGame(guess); // returns Yes of No
        if (userInput === ("Y" || "Yes")) {
          min = 1;
          max = 100;
          guess = 0;
          i = 0;
          userInput = "START-GAME";
          console.log("TEST 5 userInput =", userInput, "Guess=",guess, "Min =", min, "Max =", max,); //!TEST
        } else if (userInput === ("N" || "No")) {
          console.log("Have a Nice Day!");
          userInput = "Exit";
          console.log("TEST 6 userInput =", userInput, "Guess=",guess, "Min =", min, "Max =", max,); //!TEST
          break;
        }else{
          console.log("TEST 10 userInput =", userInput, "Guess=",guess, "Min =", min, "Max =", max,); //!TEST
        }
      } else if (userInput === ("N" || "No")) {
        console.log("TEST 7 userInput =", userInput, "Guess=",guess, "Min =", min, "Max =", max,); //!TEST
        userInput = await phraseHighLowQuestion(guess);
        if (userInput === ("L" || "Low"|| "Lower")) {
          max = guess; // returns new max
          console.log("TEST 8 userInput =", userInput, "Guess=",guess, "Min =", min, "Max =", max,); //!TEST
        } else if (userInput === ("H" || "High" || "Higher")) {
          min = guess; // returns new min
          console.log("TEST 8 userInput =", userInput, "Guess=",guess, "Min =", min, "Max =", max,); //!TEST
        }else if (userInput === "Exit"){
          console.log("Have a Bad Day!");  
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

//Capitolizes the Player's Input
function capitalizeFirstLetter(name) {
  name = name.trim();
  let firstLetter1 = name.charAt(0).toUpperCase();
  let restOfWord1 = name.slice(1).toLowerCase();
  return firstLetter1 + restOfWord1;
}
//console.log(capitalizeFirstLetter("   yes")); //! TEST

// Function to figure out
function cheating(guess,min,max) {
  if (guess == "Exit"){
    console.log("Have a Nice Day");
  }else if(guess === (min||max)){
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
  if (min === (max - 1)) {
    console.log("Test zone 3.5")
    return max; //otherwise you can never guess the Max number
    } else {
    console.log("Test zone 3.9")
    console.log("Initial Guess", Math.floor((max + min) / 2));
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
  let userInput = await ask(`Is it... ${guess}, \n Yes (Y) or No (N)?\n`);
  return capitalizeFirstLetter(userInput);
}


function notValid(userInput){
  console.log(`"${userInput}" is NOT a valid response. \n Try Again\n`);
}


// Function to say a Phrase at the when you guess the correct Number
async function phraseEndOfGame(guess) {
  console.log(`Your number is ${guess}!`);
  let userInput = await ask(`Would you like to play again? \n Yes (Y) or No (N)?\n`);
  return capitalizeFirstLetter(userInput);
}
//phraseEndOfGame(66); //! Test Print of Phrase


// Function to say a Phrase Each Round
async function phraseHighLowQuestion(guess) {
  let userInput = await ask(`Is your number higher (H) or lower (L) than ${guess}? \n`);
  return capitalizeFirstLetter(userInput);
}
//phraseHighLowQuestion(); //! Test Print of Phrase

// Function to say a Phrase at the start of the Game
function phraseStart(min,max) {
  console.log(
    `Please think of a number between ${min} and ${max} (inclusive). \n I will try to guess it.\n`
  );
}
//phraseStart(); //! Test Print of Phrase
/* 
function phraseSetRange() {
  console.log("First we need to set the Range of Numbers for our game.\n");
}
*/


// Function for Player to tell the Range
async function setRangeMax(min) {
let rangeMax = await ask(" What would you like the largest number in our game to be? \n (If your not sure I recommend using the number 100) \n");
 if(rangeMax > min){
  rangeMax = parseInt(rangeMax); // This turns the string, into a number
  return rangeMax;
  }else{
    console.log(`Sorry, but you need to choose a number that is greater than ${min} \n Please start the game again.`);
  }
}

async function setRangeMin() {
  let rangeMin = await ask("First we need to set the Range of Numbers for our game.\n What would you like the smallest number in our game to be? \n (If your not sure I recommend using the number 1) \n");
  rangeMin = parseInt(rangeMin); // This turns the string, into a number
  return rangeMin;
}
