"use strict"

class Card 
{
    #value;
    #suit;

    constructor(cardValue, cardSuit)
    {
        this.#value = cardValue;
        this.#suit = cardSuit;
    }

    createCardString()
    {
        let newCardString = "";

        switch(this.#value)
        {
            case 1:
                newCardString = `Ace of ${this.#suit}`;
                break;
            case 11:
                newCardString = `Jack of ${this.#suit}`;
                break;
            case 12:
                newCardString = `Queen of ${this.#suit}`;
                break;
            case 13:
                newCardString = `King of ${this.#suit}`;
                break;
            default:
                newCardString = `${this.#value} of ${this.#suit}`;
                break;
        }

        return newCardString;
    }
}

class Deck 
{
    #cardDeck = [];


    constructor() 
    {
        this.#createDeck();
    }

    #createDeck()
    {
        const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
        for(let i = 0; i < suits.length; i++)
        {
            for(let j = 1; j < 14; j++)
            {
                let newCard = new Card(j, suits[i]);
                this.#cardDeck.push(newCard);
            }
        }
    }

    //a way to "substitute" the toString method
    getCardsAsArray() 
    {
        let cardStrings = [];
        for (let i = 0; i < this.#cardDeck.length; i++) 
            {
                cardStrings.push(this.#cardDeck[i].createCardString());
            }
        return cardStrings;
    }
}


class Dealer
{
    #cardQuantity;
    #shuffledDeck = [];

    constructor(deck)
    {
        this.deck = deck;
        this.#shuffledDeck = this.deck.getCardsAsArray();
        this.#shuffle(this.#shuffledDeck);
    }

    
    //shuffle function from the e-book
    #shuffle(input) 
    {
        for (let i = input.length - 1; i >= 0; i--) 
        {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            let itemAtIndex = input[randomIndex];

            input[randomIndex] = input[i];
            input[i] = itemAtIndex;
        }
        return input;
    }

    

    get shuffledCards()
    {
        return this.#shuffledDeck;
    }
    
    
    set cardQuantity(quantity)
    {
        this.#cardQuantity = quantity;
    }
    get cardQuantity()
    {
        return this.#cardQuantity
    }

    dealCard()
    {
        let playerHand = [];

        for(let i = 0; i < this.#cardQuantity; i ++)
        {
            
            playerHand.push(this.#shuffledDeck.pop());
            
        }
        return playerHand;
    }
}

class Hand 
{

    #displayCards = [];

    constructor(passCards)
    {
        this.passCards = passCards;
        this.displayCard();
    }


    displayCard()
    {
        this.#displayCards = this.passCards.dealCard(); 
    }

    get displayedCards()
    {
        return this.#displayCards;
    }
}


let myDeck = new Deck();
let myDealer = new Dealer(myDeck);


let userWantsToPlay = true;
while(userWantsToPlay === true)
{
    if (myDealer.shuffledCards.length === 0) {
        window.alert("You took all the cards :<");
        userWantsToPlay = false;
        break;
    }

    let userPrompt = prompt("How many cards would you like?");

    
    if(userPrompt === null || userPrompt.trim() === "")    
    {
        userWantsToPlay = false;
        break;
    }
    
    userPrompt = parseInt(userPrompt);

    if(isNaN(userPrompt) || userPrompt > 10 || userPrompt < 1)
    {
        window.alert("Please select a valid number between 1 and 10");
    }
    else if(userPrompt > myDealer.shuffledCards.length)
    {
        // If user requests more cards than are available, notify them
        window.alert(`Only ${myDealer.shuffledCards.length} cards are left in the deck.`);
    }
    else
    {
        let userCards = userPrompt;
        myDealer.cardQuantity = userCards;

        let myHand = new Hand(myDealer);

        console.log("Requested card quantity:", userCards);
        // console.log("Shuffled cards: ", myDealer.shuffledCards);
        console.log("Dealt cards:", myHand.displayedCards);
        console.log("Remaining shuffled cards in deck:", myDealer.shuffledCards.length);
        
    }
}





