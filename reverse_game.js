// Project: Week 2
// Guess the Number - Reverse Game
// John Isabella III
 
const { log } = require('console');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log("Let's play a game where I (computer) make up a number and you (human) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promised...\n");
  console.log('You entered: ' + secretNumber);
  // Now try and complete the program.
 // Global Variable List
 let max = 100;
  let min = 1;
 let maxDummy = 100;
 let minDummy = 1; 
 let guess = 0;
 let i = 1; // Keeps track of how many times the CPU made a guess
 let prediction = 0; //This is how many guesses the CPU thinks it needs
 let highLow = "A";
 let toInfinityAnd = "START"; // These keeps the While loop running

 min = await setRangeMin(); //returns min waits for a user response
 max = await setRangeMax(min); //returns max waits for a user response
 secretNumber = randomNum(min,max); //picks the Secret Number
 maxDummy = max; //This will tell the player if they make a stupid guess
 minDummy = min; // This will tell the player if they made a stupid guess
 console.log(`I have selected a "Secret Number between the numbers ${min} and ${max}.\n`);
 prediction = wager(min, max);
 while (toInfinityAnd !== "Beyond!!!") {
  guess = await humanGuess(i);
  i++;
  doubleCheck(guess,min,max);
  dummyCheck(guess,minDummy,maxDummy);
  
  }

  process.exit();
}

//! Function List (Alphabetical Order)

//This Function confirms that the player isn't cheating
function doubleCheck(guess,min,max){
  if(min <= guess && guess <= max){
    console.log(`\nGood Guess.\n`);
  }else if(min>guess){
    console.log(`\nThat is a terrible guess!\n${guess} should not be lower than ${min}.\nThat is the top of our range.\nDon't you remember?  It wasn't that long ago.\nTry guessing a number above ${min}`);
  }else{
    console.log(`\nThat is a terrible guess!\n${guess} should not be higher than ${max}.\nThat is the top of our range.\nDon't you remember?  It wasn't that long ago.\nTry guessing a number below ${max}`);
  }
}

// TODO This function is not finished
//This checks to see if the player is making stupid guesses
function dummyCheck(guess,minDummy,maxDummy){
  if(minDummy < guess && guess < maxDummy){
    console.log(`\nSmart Guess.\n`);
  }else if(minDummy>=guess){
    console.log(`\nYou Big Dummy\n${guess} should not be lower than ${min}.\nThat is the top of our range.\nDon't you remember?  It wasn't that long ago.\nTry guessing a number above ${min}`);
  }else{
    console.log(`\nThat is a terrible guess!\n${guess} should not be higher than ${max}.\nThat is the top of our range.\nDon't you remember?  It wasn't that long ago.\nTry guessing a number below ${max}`);
  }
}

//This function stores the players guess and makes sure they are not cheating.
async function humanGuess(i) {
  let playerGuess = await ask(
    `\nThis is Guess #${i}\nPlease pick a number.\n`
  );
  if (isNaN(playerGuess) === false) {
    return playerGuess;
  } else if (notANumber === "Exit" || notANumber === "E") {
    quitGame(notANumber);
  } else {
    console.log(
      `\nNice try\n"${playerGuess}" is NOT a number...\nRestart the game\nAnd trying using Real Numbers next time\n`);
    process.exit();
}
}


// Function to Generate a Random Number
function randomNum(min, max) {
  let range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
}
//console.log("Function randomNum test",randomNum(1,100)); //! TEST
 

//Quit the game by typing "Exit"
function quitGame(quit) {
  if (quit === "Exit" || quit === "E");
  process.exit(); // This ends the Game
}


// Function for Player to set the top of the Range
async function setRangeMax(min) {
  let rangeMax = await ask(
    `\nWhat would you like the largest number in our game to be?\n(If your not sure I recommend using the number 100)\n`
  );
  rangeMax = parseInt(rangeMax); // This turns the string, into a number
  rangeMax = setRangeNumberCheck(rangeMax);
  
    if (rangeMax > min) {
      return rangeMax;
    } else {
      console.log(
        `\nSorry, but you need to choose a number that is greater than ${min}\nPlease start the game again.\n\n`
      );
      process.exit();
    }
    }

// Function for Player to set the bottom of the Range
async function setRangeMin() {
  let rangeMin = await ask(
    `First we need to set the Range of Numbers for our game.\nWhat would you like the smallest number in our game to be?\n(If your not sure I recommend using the number 1)\n`
  );
  rangeMin = setRangeNumberCheck(rangeMin);
  rangeMin = parseInt(rangeMin); // This turns the string, into a number
    return rangeMin;
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
    `\nIf you are really smart you should be able to figure out what my Secret Number is in less than ${yogiBear} guesses.\nGood luck dum-dum!\n`
  );
  return yogiBear;
}
