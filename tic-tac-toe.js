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
  return { getBoard, setMark };
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
  let index;
  let input;

  do {
    input = prompt("Enter a number between 0 and 8");
    index = Number(input);
  } while (isNaN(index) || index < 0 || index > 8 || input === null);
  console.log("Selected Number:", index);
  if (Gameboard.setMark(index, nextPlayer.mark)) {
    console.log("Valid move! Next turn:");
    Gameflow.alternate();
  } else {
    console.log("Invalid movement. Try again.");
  }
  return { currentBoard: Gameboard.getBoard() };
})();
