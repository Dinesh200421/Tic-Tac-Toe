const gameBoard = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart-button');
const resultPopup = document.getElementById('result-popup');
const resultMessage = document.getElementById('result-message');
const newGameButton = document.getElementById('new-game-button');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
newGameButton.addEventListener('click', restartGame);

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== '' || checkWinner()) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        showResultPopup(`${currentPlayer} has won!`);
        return;
    }

    if (!gameState.includes('')) {
        showResultPopup('Draw!');
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    return winningCombination.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function showResultPopup(message) {
    resultMessage.textContent = message;
    resultPopup.classList.remove('hidden');
}

function restartGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
    });
    resultPopup.classList.add('hidden');
}
