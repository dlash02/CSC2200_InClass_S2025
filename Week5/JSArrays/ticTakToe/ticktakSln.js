// Game state variables
const game = {
    board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    currentPlayer: 'X',
    gameActive: true,
    scores: {
        X: 0,
        O: 0,
        tie: 0
    }
};

// DOM elements
let gameBoard;
let  gameStatus
let resetButton
let  xScoreElement
let  oScoreElement
let  tieScoreElement
window.onload = function() {
    console.log('Page has finished loading');
    alert( "Loaded")
    gameBoard = document.getElementById('gameBoard');
    gameStatus = document.getElementById('gameStatus');
    xScoreElement = document.getElementById('xScore');
    oScoreElement = document.getElementById('oScore');
    tieScoreElement = document.getElementById('tieScore');
    resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', resetGame);
    initializeBoard();
}
// Initialize the game board
function initializeBoard() {
    gameBoard.innerHTML = '';

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-row', row);
            cell.setAttribute('data-col', col);
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }
}

// Handle cell click
function handleCellClick(event) {
    const row = parseInt(event.target.getAttribute('data-row'));
    const col = parseInt(event.target.getAttribute('data-col'));

    // Check if the cell is already filled or game is not active
    if (game.board[row][col] !== '' || !game.gameActive) {
        return;
    }

    // Update the game board array
    game.board[row][col] = game.currentPlayer;

    // Update the UI
    event.target.textContent = game.currentPlayer;
    event.target.classList.add(game.currentPlayer === 'X' ? 'x-mark' : 'o-mark');

    // Check for win or draw
    if (checkWin()) {
        gameStatus.textContent = `${game.currentPlayer} Wins!`;
        game.gameActive = false;
        game.scores[game.currentPlayer]++;
        updateScoreBoard();
    } else if (checkDraw()) {
        gameStatus.textContent = "It's a Draw!";
        game.gameActive = false;
        game.scores.tie++;
        updateScoreBoard();
    } else {
        // Switch player
        game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `${game.currentPlayer}'s Turn`;
    }
}

// Check for win
function checkWin() {
    // Check rows
    for (let row = 0; row < 3; row++) {
        if (game.board[row][0] !== '' &&
            game.board[row][0] === game.board[row][1] &&
            game.board[row][1] === game.board[row][2]) {
            return true;
        }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
        if (game.board[0][col] !== '' &&
            game.board[0][col] === game.board[1][col] &&
            game.board[1][col] === game.board[2][col]) {
            return true;
        }
    }

    // Check diagonals
    if (game.board[0][0] !== '' &&
        game.board[0][0] === game.board[1][1] &&
        game.board[1][1] === game.board[2][2]) {
        return true;
    }

    if (game.board[0][2] !== '' &&
        game.board[0][2] === game.board[1][1] &&
        game.board[1][1] === game.board[2][0]) {
        return true;
    }

    return false;
}

// Check for draw
function checkDraw() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (game.board[row][col] === '') {
                return false;
            }
        }
    }
    return true;
}

// Update score board
function updateScoreBoard() {
    xScoreElement.textContent = game.scores.X;
    oScoreElement.textContent = game.scores.O;
    tieScoreElement.textContent = game.scores.tie;
}

// Reset game
function resetGame() {
    game.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    game.currentPlayer = 'X';
    game.gameActive = true;

    // Reset UI
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x-mark', 'o-mark');
    });

    gameStatus.textContent = "X's Turn";
}