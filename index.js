// Project: Week 2
// Guess the Number
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
 
//! Global Variable List (before change)
let max = 100;
let min = 1;
let guess = 0;
let i =0;
let userInput = "A";

// TODO here is where the most of the code should go

whatIsYourRange()
startPhrase(); // Prints Statement

while(userInput !== "Y"){
cpuGuess(min,max); //return guess
questionGuess(guess); //returns "guess"
userInput = ;//the user gives input Y or N

allCaps(userInput); // Y or N
if(guess === "Y"){
  endPhrase(guess);
}else if (guess ==="N"){
  questionHighLow()
  userInput = ;//the user gives input L or H
  allCaps(userInput); // L or H
  if(userInput === "L"){
    numberIsLower(guess); // returns new max
  }else if(userInput === "H"){
    numberIsHigher(guess); // returns new min
 }else{notValid();
}
}else{notValid();
}




//! Function List (Alphabetical Order)
/* 
// Function to Generate a Random Number
function randomNum(min, max) {
  let range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
}
console.log("Function randomNum test",randomNum(1,100)); //! TEST
 */


// Function to fix userInput
function allCaps(userInput){
userInput = userInput.toUpperCase().trim();
return userInput;
}
/* 
let letter= "      x";
console.log("Function allCaps test",allCaps(letter)); //! TEST
 */


// Function for the CPU to provide a Guess
function cpuGuess(min,max){
  if(min===max-1){
    guess = max; //otherwise you can never guess the Max number
    return guess;
  }else{ guess = Math.floor((max+min)/2);
  return guess;
  }
}
/* 
let guess = 0; //! TEST Variable
console.log("Function cpuGuess test",cpuGuess(99,100)); //! TEST
 */


// Function to say a Phrase at the when you guess the correct Number
function endPhrase(guess){
  console.log(`Your number is ${guess}! \n Would you like to play again? \n Yes (Y) or No (N)?`);
}
//endPhrase(66); //! Test Print of Phrase


// Function to say a Phrase at the when you guess the correct Number
function notValid(){
  console.log(`Your input "${guess}" is not a valid choice. \n Please choose again.`);
}
/* 
let guess = "J"
notValid(); //! Test Print of Phrase
*/


// Function for when the Player says their number is Higher
function numberIsHigher(guess){
  console.log("Before numberIsHigher function Guess=",guess,"& New Min =",min); //! TEST
  min = guess;
  console.log("After numberIsHigher function Guess=",guess,"& New Min =",min); //! TEST
  return min;
}
/* 
let max = 100; //! TEST Variable
let min = 1; //! TEST Variable
console.log("Function numberIsLower test",numberIsHigher(45)); //! TEST
 */


// Function for when the Player says their number is Lower
function numberIsLower(guess){
  console.log("Before numberIsLower function Guess=",guess,"& New Max =",max); //! TEST
  max = guess;
  console.log("After numberIsLower function Guess=",guess,"& New Max =",max); //! TEST
  return max;
}
/*
let max = 100; //! TEST Variable
let min = 1; //! TEST Variable
console.log("Function numberIsLower test",numberIsLower(5)); //! TEST
 */


// Function to say a Phrase Each Round
function questionGuess(guess){
  console.log(`Is it... ${guess}, Yes (Y) or No (N)?`)
}
//questionGuess(12); //! Test of Function


// Function to say a Phrase Each Round
function questionHighLow(){
  console.log("Is it higher (H), or lower (L)?")
}
//questionHighLow(); //! Test Print of Phrase


// Function to say a Phrase at the start of the Game
function startPhrase(){
  console.log(`Please think of a number between ${min} and ${max} (inclusive). \n I will try to guess it.`)
}
//startPhrase(); //! Test Print of Phrase


// Function for Player to tell the Range
function whatIsYourRange(){
  //TODO Add Code
}
console.log("Function whatIsYourRange test",whatIsYourRange()); //! TEST



/*

// TODO START OF Guess my color parts
let userInput = "TIME TO START THE GAME"; //This doens't matter will be redefiend in the while loop immediately
let i = 0; //counter
//debugger
// WHILE LOOP
while (userInput !== "exit") {
  userInput = prompt("Pick a Number!").toLowerCase().trim(); // TODO daisy chain bother trim and lowercase PROMPT
    //console.log("The userInput is", userInput); //! TEST
  
    if (guessMyColor.includes(userInput) === true) {
      if (userInput === "exit") {
        alert("Have a Nice Day!"); // pop up
      } else if (userInput === color) {
        alert(
          `CONGRATULATIONS ${userInput} is the mystery color! Number of Guesses: ${i}. Type EXIT to end the game.`
        ); //  pop up
        //console.log("CONGRATULATIONS", userInput,"is the mystery color! \n Type EXIT to end the game.""); //! TEST in Console
        //break; //! TEST
      } else {
        i++;
        alert(`${userInput} is not the correct color. Number of Guesses: ${i}, Try Again.`); // pop up
        //console.log("SORRY \n ",userInput,"is not the correct color.\n Try Again") //! TEST in Console
        //break; //! TEST
      }
    } else {
      i++;
      alert(`SORRY! ${userInput} not on the list of colors. Number of Guesses: ${i} Try Again.`); // ALERT
      //console.log("TRY AGAIN, Your selectionis not on the list of colors!"); //! TEST in Console
      //break; //! TEST
    }
  }
// TODO END OF Guess my color parts


  process.exit();
}

*/