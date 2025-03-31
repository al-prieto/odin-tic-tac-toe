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
        return board[a];
      }
    }
    if (!board.includes(null)) {
      return "Draw";
    }
    return null;
  };

  return { getBoard, setMark, checkWinner };
};

function createPlayer(name, mark) {
  return { name, mark };
}

const gameboard = Gameboard();
const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");

let nextPlayer = player1;

const Gameflow = (function () {
  const alternatePlayer = function () {
    nextPlayer = nextPlayer === player1 ? player2 : player1;
  };
  return { alternate: alternatePlayer };
})();

const Gameplay = (function () {
  while (true) {
    let index;
    let input;

    do {
      input = prompt("Enter a number between 0 and 8");
      index = Number(input);
    } while (isNaN(index) || index < 0 || index > 8 || input === null);

    console.log("Selected Number:", index);

    if (gameboard.setMark(index, nextPlayer.mark)) {
      console.log("Valid move! Next turn:");
      console.log("Current Board:", gameboard.getBoard());
      Gameflow.alternate();
      console.log(`Next Player: ${nextPlayer.name}`);

      const result = gameboard.checkWinner(gameboard.getBoard());
      if (result === "Draw") {
        console.log("It's a draw! Game over.");
        break;
      } else if (result !== null) {
        console.log(`Player ${result} wins! Game over.`);
        break;
      } else {
        console.log("Game continues...");
        console.log("Current Board:", gameboard.getBoard());
        console.log(`Next Player: ${nextPlayer.name}`);
      }
    } else {
      console.log("Invalid movement. Try again.");
    }
  }
})();
