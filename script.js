let currentGame = "";
let currentPlayer = 1;
const displayedPlayer = document.querySelector(".current-player-turn")
const newGameBtn = document.getElementById("new-game");
const allBoxes = Array.from(document.querySelectorAll(".game-square"));
let makeGame = (name1, name2) => {
  const gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  let getBoard = () => {
    return gameBoard;
  };
  let makePlayer = (n, i) => {
    let score = 0;
    const name = n;
    const id = i;
    let increaseScore = () => score++;
    return { name, id, score, increaseScore };
  };
  let playerOne = makePlayer(name1, 1);
  let playerTwo = makePlayer(name2, 2);
  let getPlayerOne = () => {
    return playerOne;
  };
  let getPlayerTwo = () => {
    return playerTwo;
  };

  let makeMove = (x, y, player) => {
    gameBoard[x][y] = player.id;
  };

  let winnerCheck = () => {
    if (
        // Check rows
        (gameBoard[0][0] !== null && gameBoard[0][0] === gameBoard[0][1] && gameBoard[0][0] === gameBoard[0][2]) ||
        (gameBoard[1][0] !== null && gameBoard[1][0] === gameBoard[1][1] && gameBoard[1][0] === gameBoard[1][2]) ||
        (gameBoard[2][0] !== null && gameBoard[2][0] === gameBoard[2][1] && gameBoard[2][0] === gameBoard[2][2]) ||

        // Check columns
        (gameBoard[0][0] !== null && gameBoard[0][0] === gameBoard[1][0] && gameBoard[0][0] === gameBoard[2][0]) ||
        (gameBoard[0][1] !== null && gameBoard[0][1] === gameBoard[1][1] && gameBoard[0][1] === gameBoard[2][1]) ||
        (gameBoard[0][2] !== null && gameBoard[0][2] === gameBoard[1][2] && gameBoard[0][2] === gameBoard[2][2]) ||

        // Check diagonals
        (gameBoard[0][0] !== null && gameBoard[0][0] === gameBoard[1][1] && gameBoard[0][0] === gameBoard[2][2]) || 
        (gameBoard[0][2] !== null && gameBoard[0][2] === gameBoard[1][1] && gameBoard[0][2] === gameBoard[2][0])
    ) {
        return true;
    }
  };
  return { getPlayerOne, getPlayerTwo, getBoard, makeMove, winnerCheck };
};


newGameBtn.addEventListener("click",()=>{
    currentGame=makeGame().gameBoard;
});

allBoxes.forEach(b => {
    let move=()=> {
        if (currentPlayer === 1) {
            b.style.borderColor = "blue";
            currentPlayer=2;
        }else{
            b.style.borderColor="red"
            currentPlayer=1;
        }
        b.removeEventListener("click",move) //event listener works only one time
    }
    b.addEventListener("click",move);

});
