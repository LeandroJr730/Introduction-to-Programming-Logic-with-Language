"use strict"

const dummyImage = "./Images/dummy.jpg";

//create Deck
class Deck
{
    numbersDeck = ['./Images/image1.jpg', './Images/image2.jpg', 
    './Images/image3.jpg','./Images/image4.jpg', './Images/image5.jpg', 
    './Images/image6.jpg', './Images/image7.jpg','./Images/image8.jpg', 
    './Images/image1.jpg','./Images/image2.jpg', './Images/image3.jpg',
    './Images/image4.jpg','./Images/image5.jpg','./Images/image6.jpg', 
    './Images/image7.jpg','./Images/image8.jpg'];
    constructor()
    {
    }
    shuffleDeck()
    {
        for (let i = 0; i < this.numbersDeck.length; i++)
        {
            // picks the random number between 0 and length of the deck
            let shuffle = Math.floor(Math.random() * (this.numbersDeck.length));
            //uses 3 buckets method to swap cards taken from ebook pg 248
            let temp = this.numbersDeck[i]; //holds one card in temp variable
            this.numbersDeck[i] = this.numbersDeck[shuffle];
            this.numbersDeck[shuffle] = temp;
        }

        return this.numbersDeck
    }
}
let con = new Deck();
const array = con.shuffleDeck();


let firstImage;
let secondImage;
let srcImage1;

let numClicks = 0;
let numOfMisses = 0;

let clickEnabled = true;

//sleep function used with async and await
//source for sleep function:
//https://www.tutorialspoint.com/javascript-sleep-function#:~:text=Object%20Oriented%20Programming-,Sleep(),Java%20has%20thread.
//this video (from 10:39:50 until 10:57:00) also helped with general understanding:
//https://youtu.be/lfmg-EJ8gm4?si=VCHR3Si9yFqNdtoL
function sleep(ms)
{
    return new Promise((resolve) => {setTimeout(resolve, ms)})
}

// disable cursor function
function disableCursor() 
{
    for (let i = 0; i < array.length; i++) 
    {
        document.getElementById(`imgCellNum${i + 1}`).style.cursor = "default";
    }
}
  
// enable cursor function
function enableCursor() 
{
    for (let i = 0; i < array.length; i++) 
    {
      document.getElementById(`imgCellNum${i + 1}`).style.cursor = "pointer";
    }
  }

for (let i = 0; i < array.length; i++)
{
    document.getElementById(`imgCellNum${i+1}`).src = array[i];
    document.getElementById(`imgCellNum${i+1}`).src = dummyImage;
    document.getElementById(`imgCellNum${i+1}`).style.cursor = "pointer";

    document.getElementById(`imgCellNum${i+1}`).addEventListener("click", async() => 
        {
            if(clickEnabled === false)
            {
                return;
            }
            if(numOfMisses >= 16)
            {
                disableCursor();
                alert("Game Over");
                return;
            }
            
            numClicks++;
            
            if(numClicks == 1)
            {
                firstImage = array[i];
                document.getElementById(`imgCellNum${i+1}`).src = array[i];
                srcImage1 = document.getElementById(`imgCellNum${i+1}`);
                secondImage = null; 
            }
            else if(numClicks == 2)
            {
                secondImage = array[i];
                document.getElementById(`imgCellNum${i+1}`).src = array[i];
                numClicks = 0;

                clickEnabled = false; //disables click
                disableCursor();

                if(firstImage === secondImage)
                {
                    //checking id to see if the person clicked the same cell
                    if(srcImage1.id === document.getElementById(`imgCellNum${i+1}`).id)
                    {   
                        console.log('same Image');
                        numOfMisses++;
                        await sleep(1500); //sleeping game for 1.5s
                        wrongChoice();
                    }
                    else
                    {
                        console.log("EQUAL")

                        //removes both images
                        srcImage1.src = "";
                        document.getElementById(`imgCellNum${i+1}`).src = "";
                        //end of removing both images

                        clickEnabled = true; //enables click again
                        enableCursor();
                    }
                    
                }
                else if(firstImage !== secondImage)
                {
                    numOfMisses++;
                    await sleep(1500); //sleeping game for 1.5s
                    wrongChoice();
                }

                function wrongChoice()
                {
                    //dummy image back
                    srcImage1.src = dummyImage;
                    document.getElementById(`imgCellNum${i+1}`).src = dummyImage;
                    //end of dummy image back

                    console.log("WRONG");

                    clickEnabled = true; //enabling click again after the sleep function
                    enableCursor();
                }
            }
        })
}