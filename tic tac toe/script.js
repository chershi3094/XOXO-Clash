const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const finishBtn = document.getElementById('finishButton');
const scoreboard = document.getElementById('scoreboard');
const winnerPopup = document.getElementById('winnerPopup');
const winnerMessage = document.getElementById('winnerMessage');
const closePopupBtn = document.getElementById('closePopup');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let scores = { X: 0, O: 0 };

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],  // Rows
  [0,3,6], [1,4,7], [2,5,8],  // Columns
  [0,4,8], [2,4,6]            // Diagonals
];

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !isGameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    scores[currentPlayer]++;
    updateScoreboard();
    winnerMessage.textContent = `${currentPlayer} wins! 🎉`;
    showWinnerPopup();
    isGameActive = false;
  } else if (!board.includes("")) {
    statusText.textContent = "It's a tie!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winConditions.some(cond => {
    const [a, b, c] = cond;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  statusText.textContent = "X's turn";
  cells.forEach(cell => cell.textContent = "");
}

function showWinnerPopup() {
  winnerPopup.style.display = "flex";
  fireworks();
}

function closeWinnerPopup() {
  winnerPopup.style.display = "none";
  resetGame();
}

function fireworks() {
  // Create a fireworks container
  const fireworksContainer = document.createElement('div');
  fireworksContainer.classList.add('fireworks-container');
  document.body.appendChild(fireworksContainer);

  // Create individual fireworks elements
  for (let i = 0; i < 5; i++) {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    fireworksContainer.appendChild(firework);
  }

  // Set a timeout to remove the fireworks after animation
  setTimeout(() => {
    fireworksContainer.remove();
  }, 3000);  // Fireworks display for 3 seconds
}

function updateScoreboard() {
  scoreboard.textContent = `Score - X: ${scores.X} | O: ${scores.O}`;
}

finishBtn.addEventListener('click', () => {
  resetGame();
  scores = { X: 0, O: 0 };
  updateScoreboard();
  statusText.textContent = "";
});

closePopupBtn.addEventListener('click', closeWinnerPopup);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
statusText.textContent = "X's turn";
