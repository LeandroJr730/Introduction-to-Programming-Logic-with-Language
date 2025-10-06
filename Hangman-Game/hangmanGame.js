/*HANGMAN GAME*/
"use strict";

/*get random answer from an array of words*/
const gameWords = ["scrumptious", "tree", "baseball", "pizza", "blackhawks", "college"];
const answersLength = gameWords.length;
const randomNumber = Math.floor(Math.random() * answersLength);
const randomAnswer = gameWords[randomNumber];
console.log(`The answer is: ${randomAnswer}`);

/*hide the answer replacing all the character by a "*" */
let hiddenGuessAnswer = randomAnswer.replace(/./g, "*");

/*will store the user guesses*/
let userGuess = ""; 

/*amount of guesses*/
const guessMaximumAmount = 6;
let guessAmount = 0;




let userWantsToContinue = true;
while (userWantsToContinue === true) 
{
  const userInputBasic = prompt(`HANGMAN GAME\n\nThe answer is ${hiddenGuessAnswer}\n\nThe amount of wrong guesses you had: ${guessAmount} out of ${guessMaximumAmount}\n\nPlease type a single word or guess the answer:`);
  
  /*transforms input to lower case*/
  const userInput = userInputBasic.toLowerCase();
  
  /*check right and wrong inputs */
  if (userInput === randomAnswer) 
  {
    window.alert(`CONGRATULATIONS YOU GUESSED THE WORD CORRECTLY\n\nThe answer was: ${randomAnswer}\n\nAmount of wrong guesses: ${guessAmount}`);
    break;
  } 
  else if (userInput === null) 
  {
    window.alert("See you next time!");
    userWantsToContinue = false;
  } 
  else if (userInput.length > 1 || userInput === "" || typeof userInput != "string") 
  {
    guessAmount++;
    window.alert(`Please provide a valid input.\n\nTotal wrong guesses: ${guessAmount} out of ${guessMaximumAmount}`);
  }
  else
  {

    /*stores the user guesses*/
    
    userGuess += userInput;

    /*check and store amount of guesses */
    if(randomAnswer.includes(userInput) !== true)
    {
      guessAmount++;
      window.alert(`Wrong guess.\n\nThe amount of wrong guesses you had: ${guessAmount} out of ${guessMaximumAmount}`);
    }
  }

  /*ends game if the maximum amount of guesses was tried */
  if(guessAmount >= guessMaximumAmount)
  {
      window.alert(`You tried, but you failed!\n\nThe amount of wrong guesses you had: ${guessAmount} out of ${guessMaximumAmount}`);
      break;
  }

  /*Create a dynamic regular expression using the RegExp constructor */
  /*"The RegExp constructor allows you to dynamically build a regular expression."*/
  /*ChatGPT helped me with this because I was struggling to add a variable inside the: /[^userGuess]/g*/
  function replaceGuess()
  {
    const regex = new RegExp(`[^${userGuess}]`, 'g');
  
    hiddenGuessAnswer = randomAnswer.replaceAll(regex, "*");
  
    return hiddenGuessAnswer;
    
  }
  replaceGuess();

  
  /*checking if you won the game*/
  if(hiddenGuessAnswer === randomAnswer)
  {
    window.alert(`CONGRATULATIONS YOU GUESSED THE WORD CORRECTLY\n\nThe answer was: ${randomAnswer}\n\nWrong guesses: ${guessAmount}`);
    break;
  }
}
