const board = document.getElementById('board');
const resultDisplay = document.getElementById('result');
const restartBtn = document.getElementById('restartBtn');
const continueBtn = document.getElementById('continueBtn');
const playerScoreDisplay = document.getElementById('playerScore');
const computerScoreDisplay = document.getElementById('computerScore');
const difficultySelect = document.getElementById('difficultySelect');

const cells = Array.from({ length: 9 }, (_, index) => createCell(index));

let currentPlayer = 'X';
let isGameActive = true;
let playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
let difficultyLevel = 'Easy';

function createCell(index) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = index;
  cell.addEventListener('click', () => handleCellClick(index));
  board.appendChild(cell);
  return cell;
}

function updateScores() {
  playerScoreDisplay.textContent = `Player Score: ${playerScore}`;
  computerScoreDisplay.textContent = `Computer Score: ${computerScore}`;

  // Save scores to localStorage
  localStorage.setItem('playerScore', playerScore);
  localStorage.setItem('computerScore', computerScore);
}

function handleCellClick(index) {
  if (!isGameActive || cells[index].textContent !== '') {
    return;
  }

  cells[index].textContent = currentPlayer;
  if (checkWinner()) {
    resultDisplay.textContent = `Player ${currentPlayer} wins!`;
    isGameActive = false;
    playerScore++;
    updateScores();
    showContinueButton(); // Show the "Continue" button when there's a winner
  } else if (cells.every(cell => cell.textContent !== '')) {
    resultDisplay.textContent = 'It\'s a draw!';
    isGameActive = false;
    showContinueButton(); // Show the "Continue" button when it's a draw
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (currentPlayer === 'O') {
      // Computer's move
      setTimeout(() => makeComputerMove(), 500);
    }
  }
}

function makeComputerMove() {
  if (difficultyLevel === 'Easy') {
    makeRandomMove();
  } else if (difficultyLevel === 'Hard') {
    makeHardMove();
  } else if (difficultyLevel === 'Very Hard') {
    makeVeryHardMove();
  }
}

function makeRandomMove() {
  const emptyCells = cells.filter(cell => cell.textContent === '');
  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerMove = emptyCells[randomIndex];
    computerMove.textContent = 'O';

    if (checkWinner()) {
      resultDisplay.textContent = 'Computer wins!';
      isGameActive = false;
      computerScore++;
      updateScores();
      showContinueButton(); // Show the "Continue" button when there's a winner
    } else if (cells.every(cell => cell.textContent !== '')) {
      resultDisplay.textContent = 'It\'s a draw!';
      isGameActive = false;
      showContinueButton(); // Show the "Continue" button when it's a draw
    } else {
      currentPlayer = 'X';
    }
  }
}

function makeHardMove() {
  const emptyCells = cells.filter(cell => cell.textContent === '');
  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerMove = emptyCells[randomIndex];
    computerMove.textContent = 'O';

    if (checkWinner()) {
      resultDisplay.textContent = 'Computer wins!';
      isGameActive = false;
      computerScore++;
      updateScores();
      showContinueButton(); // Show the "Continue" button when there's a winner
    } else if (cells.every(cell => cell.textContent !== '')) {
      resultDisplay.textContent = 'It\'s a draw!';
      isGameActive = false;
      showContinueButton(); // Show the "Continue" button when it's a draw
    } else {
      currentPlayer = 'X';
    }
  }
}

function makeVeryHardMove() {
  const emptyCells = cells.filter(cell => cell.textContent === '');
  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerMove = emptyCells[randomIndex];
    computerMove.textContent = 'O';

    if (checkWinner()) {
      resultDisplay.textContent = 'Computer wins!';
      isGameActive = false;
      computerScore++;
      updateScores();
      showContinueButton(); // Show the "Continue" button when there's a winner
    } else if (cells.every(cell => cell.textContent !== '')) {
      resultDisplay.textContent = 'It\'s a draw!';
      isGameActive = false;
      showContinueButton(); // Show the "Continue" button when it's a draw
    } else {
      currentPlayer = 'X';
    }
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombinations.some(combination =>
    combination.every(index => cells[index].textContent === currentPlayer)
  );
}

function restartGame() {
  isGameActive = true;
  currentPlayer = 'X';
  resultDisplay.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
  });

  // Clear the result display
  resultDisplay.textContent = '';

  // Reset scores
  playerScore = 0;
  computerScore = 0;
  updateScores();
  hideContinueButton(); // Hide the "Continue" button when restarting
}

function continueGame() {
  isGameActive = true;
  resultDisplay.textContent = '';

  // Reset the board
  cells.forEach(cell => {
    cell.textContent = '';
  });

  hideContinueButton(); // Hide the "Continue" button when continuing

  // Continue the game from the current state
  if (currentPlayer === 'O') {
    // Computer's move
    setTimeout(() => makeComputerMove(), 500);
  }
}

function showContinueButton() {
  continueBtn.style.display = 'block';
}

function hideContinueButton() {
  continueBtn.style.display = 'none';
}

function updateDifficulty() {
  difficultyLevel = difficultySelect.value;
}

// Initialize scores on page load
updateScores();

// Event listeners for buttons and difficulty select
restartBtn.addEventListener('click', restartGame);
continueBtn.addEventListener('click', continueGame);
difficultySelect.addEventListener('change', updateDifficulty);
