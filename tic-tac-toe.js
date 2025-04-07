const gameBoard = document.querySelector(".gameboard");
const cells = document.querySelectorAll(".cell");
const gameInfo = document.querySelector("#game-info");
const resetBtn = document.querySelector("#reset-button");

// LOGIC //

const Gameboard = function () {
  let board = Array(9).fill(null);

  const getBoard = () => board;

  const setMark = (index, marker) => {
    if (board[index] !== null) {
      console.log("Invalid move. The cell is already occupied.");
      return false;
    }
    board[index] = marker;
    return true;
  };

  const checkWinner = () => {
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

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], combo: combo };
      }
    }
    if (!board.includes(null)) {
      return { winner: "Draw", combo: null };
    }
    return { winner: null, combo: null };
  };

  const resetBoard = () => {
    board = Array(9).fill(null);
  };
  return { getBoard, setMark, checkWinner, resetBoard };
};

function createPlayer(name, mark) {
  return { name, mark };
}

const gameboard = Gameboard();
const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");
let nextPlayer = player1;
let gameActive = true;

const Gameflow = (function () {
  const alternatePlayer = function () {
    nextPlayer = nextPlayer === player1 ? player2 : player1;
  };

  const initGame = function () {
    gameActive = true;
    gameInfo.textContent = `Turn of ${nextPlayer.name} (${nextPlayer.mark})`;
    gameBoard.classList.remove("game-over");
  };

  const playTurn = function (index, cell) {
    if (!gameActive) return false;

    if (gameboard.setMark(index, nextPlayer.mark)) {
      cell.textContent = nextPlayer.mark;
      cell.classList.add(nextPlayer.mark);

      const result = gameboard.checkWinner();

      if (result.winner === "Draw") {
        gameInfo.textContent = "Draw!";
        gameActive = false;
        gameBoard.classList.add("game-over");
      } else if (result.winner !== null) {
        gameInfo.textContent = `${nextPlayer.name} win!`;
        gameActive = false;
        gameBoard.classList.add("game-over");

        if (result.combo) {
          result.combo.forEach((i) => {
            document.querySelector(`#cell-${i}`).classList.add("winner");
          });
        }
      } else {
        alternatePlayer();
        gameInfo.textContent = `Turn of ${nextPlayer.name}`;
      }
      return true;
    }
    return false;
  };

  const resetGame = function () {
    gameboard.resetBoard();
    gameActive = true;
    nextPlayer = player1;

    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("X", "O", "winner");
    });

    gameBoard.classList.remove("game-over");
    gameInfo.textContent = `Turn of ${nextPlayer.name} (${nextPlayer.mark})`;
  };

  return {
    alternate: alternatePlayer,
    init: initGame,
    playTurn: playTurn,
    reset: resetGame,
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  Gameflow.init();

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const index = cell.id.split("-")[1];
      Gameflow.playTurn(index, cell);
    });
  });

  resetBtn.addEventListener("click", Gameflow.reset);
});

document.addEventListener("DOMContentLoaded", () => {
  const startGameBtn = document.querySelector("#start-game");
  const player1Input = document.querySelector("#player1-name");
  const player2Input = document.querySelector("#player2-name");

  // Configurar el evento de inicio del juego
  startGameBtn.addEventListener("click", () => {
    // Asignar nombres ingresados a los jugadores
    const player1Name = player1Input.value.trim() || "Jugador 1";
    const player2Name = player2Input.value.trim() || "Jugador 2";

    player1.name = player1Name;
    player2.name = player2Name;

    // Mostrar quién inicia el juego
    gameInfo.textContent = `Turno de ${nextPlayer.name} (${nextPlayer.mark})`;

    // Ocultar la configuración inicial
    document.querySelector("#player-setup").style.display = "none";

    // Mostrar el tablero de juego
    gameBoard.style.display = "grid";
  });

  // Inicializar el juego
  Gameflow.init();
});
