let diceQuantity;
// const pText = document.createElement("p");
// const hrTag = document.createElement("hr");

while ((userInput = true)) {
  diceQuantity = prompt(
    "Write the quantity of dice you want, (between 1 and 10):"
  );

  diceQuantity = parseInt(diceQuantity);

  //⬇️⬇️check if user selects cancel or enter something that is not a number
  if (diceQuantity === null || isNaN(diceQuantity)) {
    window.alert("Select a valid input next time!😡");
    break;
  }
  //⬇️⬇️check if user selects a number that is not between 1 and 10
  else if (diceQuantity <= 0 || diceQuantity > 10) {
    window.alert("Please select a valid number between 1 and 10");
  }
  //⬇️⬇️dice game
  else if ((userInput = true)) {
    while ((userWantsToContinue = true)) {
      let randAnswer = "";
      let diceNumber;

      for (diceNumber = 1; diceNumber < diceQuantity + 1; diceNumber++) {
        //prettier-ignore

        for (let randAnswerLoop = 0; randAnswerLoop < diceQuantity; randAnswerLoop++) {
    
          randAnswer = Math.floor(Math.random() * 6 + 1);
    
        }

        console.log(`You have rolled die number ${diceNumber}. The result is ${randAnswer}.`); //prettier-ignore

        const pText = document.createElement("p");
        pText.innerText += `You have rolled die number ${diceNumber}. The result is ${randAnswer}.`;
        document.body.appendChild(pText);
      }
      console.log("-----------------------------------------------");
      const hrTag = document.createElement("hr");
      document.body.appendChild(hrTag);

      let promptAgain = prompt(`Type "YES" or "Y" if you want to add another dice`); //prettier-ignore
      playAgain = promptAgain.toLowerCase();
      if (playAgain === "yes" || playAgain === "y") {
        diceQuantity++;
        diceNumber++;
      } else {
        break;
      }
    }
    break;
  }
}
