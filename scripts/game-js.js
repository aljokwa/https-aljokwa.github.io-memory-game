/**
 * Memory Game
 * A simple card matching game implemented in vanilla JavaScript
 */

// DOM elements
const gameBoard = document.getElementById('game-board');
const movesCount = document.getElementById('moves-count');
const timeValue = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const restartButton = document.getElementById('restart');
const resultElement = document.getElementById('result');
const resultMovesElement = document.getElementById('result-moves');
const resultTimeElement = document.getElementById('result-time');
const playAgainButton = document.getElementById('play-again');

// Game state variables
let cards;
let interval;
let firstCard = false;
let secondCard = false;
let moves = 0;
let seconds = 0;
let minutes = 0;
let isGameActive = false;
let matchedPairs = 0;

// Card items with emoji as values (can be replaced with images)
const cardValues = [
    { value: '🐶', name: 'dog' },
    { value: '🐱', name: 'cat' },
    { value: '🐭', name: 'mouse' },
    { value: '🐹', name: 'hamster' },
    { value: '🐰', name: 'rabbit' },
    { value: '🦊', name: 'fox' },
    { value: '🐻', name: 'bear' },
    { value: '🐼', name: 'panda' }
];

// Timer functions
const timeGenerator = () => {
    seconds += 1;
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }

    // Format time before displaying
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `${minutesValue}:${secondsValue}`;
};

// Initialize game
const initializeGame = () => {
    matchedPairs = 0;
    moves = 0;
    seconds = 0;
    minutes = 0;
    
    // Initialize timer and moves
    timeValue.textContent = '00:00';
    movesCount.textContent = moves;

    // Generate and display cards
    createCards();
};

// Create and display cards
const createCards = () => {
    gameBoard.innerHTML = '';
    
    // Create array with pairs of cards
    let cardPairs = [...cardValues, ...cardValues];
    
    // Shuffle cards
    cardPairs.sort(() => Math.random() - 0.5);
    
    // Generate cards and add to game board
    cardPairs.forEach((item) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-card-name', item.name);
        
        // Create card inner structure
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.textContent = item.value;
        
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        
        // Append card elements
        card.appendChild(cardFront);
        card.appendChild(cardBack);
        gameBoard.appendChild(card);
    });

    // Add event listeners to cards
    cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            if (isGameActive && !card.classList.contains('flipped') && !card.classList.contains('card-matched')) {
                flipCard(card);
            }
        });
    });
};

// Card flip functionality
const flipCard = (card) => {
    card.classList.add('flipped');
    
    // Logic for checking cards
    if (!firstCard) {
        // First card pick
        firstCard = card;
    } else if (!secondCard && card !== firstCard) {
        // Second card pick
        secondCard = card;
        isGameActive = false;
        
        // Increase moves
        moves++;
        movesCount.textContent = moves;
        
        // Check for match
        checkForMatch();
    }
};

// Check if selected cards match
const checkForMatch = () => {
    const firstCardName = firstCard.getAttribute('data-card-name');
    const secondCardName = secondCard.getAttribute('data-card-name');
    
    if (firstCardName === secondCardName) {
        // Cards match
        firstCard.classList.add('card-matched');
        secondCard.classList.add('card-matched');
        
        // Reset cards
        firstCard = false;
        secondCard = false;
        
        // Increment matched pairs and check for win
        matchedPairs++;
        if (matchedPairs === cardValues.length) {
            gameOver();
        } else {
            isGameActive = true;
        }
    } else {
        // Cards don't match, flip back after delay
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            
            // Reset cards
            firstCard = false;
            secondCard = false;
            isGameActive = true;
        }, 1000);
    }
};

// Game over function
const gameOver = () => {
    clearInterval(interval);
    
    // Display result screen
    resultMovesElement.textContent = moves;
    resultTimeElement.textContent = timeValue.textContent;
    resultElement.classList.remove('hide');
};

// Start game function
const startGame = () => {
    if (!isGameActive) {
        isGameActive = true;
        // Start timer
        interval = setInterval(timeGenerator, 1000);
        startButton.classList.add('hide');
        stopButton.classList.remove('hide');
    }
};

// Stop game function
const stopGame = () => {
    if (isGameActive) {
        isGameActive = false;
        clearInterval(interval);
        startButton.classList.remove('hide');
        stopButton.classList.add('hide');
    }
};

// Event listeners
startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);
restartButton.addEventListener('click', () => {
    stopGame();
    initializeGame();
    resultElement.classList.add('hide');
    startButton.classList.remove('hide');
    stopButton.classList.add('hide');
});
playAgainButton.addEventListener('click', () => {
    resultElement.classList.add('hide');
    initializeGame();
    startButton.classList.remove('hide');
    stopButton.classList.add('hide');
});

// Initialize game when page loads
window.onload = () => {
    stopButton.classList.add('hide');
    initializeGame();
};
