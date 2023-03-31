if((userInput || highLow || PlayAgain) === ("Exit" || "E")){
    console.log("Time to go bye-bye!");
    process.exit();
}else{
    min = await setRangeMin(); //returns min waits for a user response
    max = await setRangeMax(min); //returns max waits for a user response
    console.log(`Our range has been set from ${min} to ${max}.`);
    phraseStart(min, max); // Prints Statement
    userInput = "A";
    console.log(   "TEST 1 userInput =", userInput,"Guess=",guess,"Min =",min,"Max =", max); //!TEST
    
}