document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const resetButton = document.getElementById("reset");
    const columns = 7;
    const rows = 6;
    let currentPlayer = "red";
    let gameActive = true;
    let grid = [];
  
    for (let i = 0; i < columns; i++) {
      grid[i] = Array(rows).fill(null);
    }
  
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.col = col;
        cell.dataset.row = row;
        board.appendChild(cell);
  
        cell.addEventListener("click", () => {
          if (gameActive) {
            makeMove(col);
          }
        });
      }
    }
  
   
    resetButton.addEventListener("click", resetGame);
  
    function makeMove(col) {
   
      for (let row = rows - 1; row >= 0; row--) {
        if (grid[col][row] === null) {
          grid[col][row] = currentPlayer;
          const cell = document.querySelector(`.cell[data-col='${col}'][data-row='${row}']`);
          cell.classList.add(currentPlayer);
  
          if (checkWin(col, row)) {
            gameActive = false;
            setTimeout(() => {
              alert(`${currentPlayer} wins!`);
            }, 100);
          } else if (grid.flat().every(cell => cell !== null)) {
            gameActive = false;
            setTimeout(() => {
              alert("It's a draw!");
            }, 100);
          } else {
            currentPlayer = currentPlayer === "red" ? "yellow" : "red";
          }
          break;
        }
      }
    }
  
    function checkWin(col, row) {
      return checkDirection(col, row, 1, 0) || 
             checkDirection(col, row, 0, 1) ||
             checkDirection(col, row, 1, 1) ||  
             checkDirection(col, row, 1, -1);   
    }
  
    function checkDirection(col, row, colIncrement, rowIncrement) {
      let count = 0;
      for (let i = -3; i <= 3; i++) {
        const checkCol = col + i * colIncrement;
        const checkRow = row + i * rowIncrement;
        if (
          checkCol >= 0 && checkCol < columns &&
          checkRow >= 0 && checkRow < rows &&
          grid[checkCol][checkRow] === currentPlayer
        ) {
          count++;
          if (count === 4) return true;
        } else {
          count = 0;
        }
      }
      return false;
    }
  
    function resetGame() {
      grid = grid.map(col => col.fill(null));
      document.querySelectorAll(".cell").forEach(cell => {
        cell.classList.remove("red", "yellow");
      });
      currentPlayer = "red";
      gameActive = true;
    }
  });
  