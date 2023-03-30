// Project: Week 2
// Guess the Number - Reverse Game
// John Isabella III
 
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promised...\n");
  console.log('You entered: ' + secretNumber);
  // Now try and complete the program.
 


  process.exit();
}

//! Function List (Alphabetical Order)

// Function to Generate a Random Number
function randomNum(min, max) {
  let range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
}
console.log("Function randomNum test",randomNum(1,100)); //! TEST
 