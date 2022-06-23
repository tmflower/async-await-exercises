// NUMBER FACTS


// 1. Get fact about favorite number

let fact = document.querySelector('#fact')

async function getFact() {
    let res = await axios.get(`http://numbersapi.com/42`)
    fact.innerText = res.data
}

getFact()


// 2. Get multiple number facts

const facts = document.querySelector('#facts');
const nums = [12, 53, 19, 47, 100];
const numFacts = [];

async function getFacts() {
    for (let num of nums) {
        let res = await axios.get(`http://numbersapi.com/${num}`)
        fact = res.data
        numFacts.push(fact);
    }
    for (let numFact of numFacts) {
        let newFact = document.createElement('p');
        newFact.innerText = numFact;
        facts.append(newFact);
    }
}

getFacts()



// 3. Get four facts about favorite number

const fourFacts = document.querySelector('#fourFacts')

async function get4Facts() {
    for (let i = 0; i <=3; i++) {
        let res = await axios.get(`http://numbersapi.com/13`);
        fact = res.data;
        newFact = document.createElement('p');
        newFact.innerText = fact;
        fourFacts.append(newFact);
    }    
}

get4Facts()



// DECK OF CARDS

// 1. Get a single card from newly shuffled deck:

async function getCard() {
    let res = await axios.get(`http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
    let deckId = res.data.deck_id;
    res = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    let val = res.data.cards[0].value;
    let suit = res.data.cards[0].suit;
    console.log(`Your card is ${val} of ${suit}`)
}

getCard()


// 2. Get 2 cards from the same deck:

async function get2Cards() {
    let res = await axios.get(`http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
    let deckId = res.data.deck_id;
    for (let i = 0; i<=1; i++) {
        res = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        let val = res.data.cards[0].value;
        let suit = res.data.cards[0].suit;
        console.log(`Your card is ${val} of ${suit}`)
    }
}

get2Cards()


// 3. Draw cards one by one from deck when user clicks button on html page

const btn = document.querySelector('#btn')
const cards = document.querySelector('#cards')
let deckId;

async function getAndShuffle() {
    let res = await axios.get(`http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
    deckId = res.data.deck_id;
}

async function drawCard() {
    let res = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    let img = res.data.cards[0].image
    let remaining = res.data.remaining;
    if (remaining === 0) {
        alert("No more cards!");
        btn.removeEventListener('click', drawCard)
        return;
    }
    else {
        newCard = document.createElement('p');
        newCard.innerHTML = `<img src = "${img}" height=100px>`
        cards.append(newCard);
    }
}

window.addEventListener('load', function() {
    getAndShuffle();
})

btn.addEventListener('click', drawCard)
