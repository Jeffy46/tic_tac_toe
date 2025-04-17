let currentGame = "";
let currentPlayer = 1;
let active = true;
let turns = 0;
const displayedPlayer = document.querySelector(".current-player-turn");
const newGameBtn = document.getElementById("new-game");
const allBoxes = Array.from(document.querySelectorAll(".game-square"));
let makeGame = (name1, name2) => {
  const gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  let getBoard = () => gameBoard;

  let makePlayer = (n, i) => {
    let score = 0;
    const name = n;
    const id = i;
    let increaseScore = () => score++;
    return { name, id, score, increaseScore };
  };

  let playerOne = makePlayer(name1, 1);
  let playerTwo = makePlayer(name2, 2);

  let getPlayerOne = () => playerOne;
  let getPlayerTwo = () => playerTwo;

  let makeMove = (x, y, player) => {
    if (gameBoard[x][y] === "") {
      gameBoard[x][y] = player;
    }
    turns++;
  };

  let winnerCheck = () => {
    if (
      // Check rows
      (gameBoard[0][0] !== "" && gameBoard[0][0] === gameBoard[0][1] && gameBoard[0][0] === gameBoard[0][2]) ||
      (gameBoard[1][0] !== "" && gameBoard[1][0] === gameBoard[1][1] && gameBoard[1][0] === gameBoard[1][2]) ||
      (gameBoard[2][0] !== "" && gameBoard[2][0] === gameBoard[2][1] && gameBoard[2][0] === gameBoard[2][2]) ||

      // Check columns
      (gameBoard[0][0] !== "" && gameBoard[0][0] === gameBoard[1][0] && gameBoard[0][0] === gameBoard[2][0]) ||
      (gameBoard[0][1] !== "" && gameBoard[0][1] === gameBoard[1][1] && gameBoard[0][1] === gameBoard[2][1]) ||
      (gameBoard[0][2] !== "" && gameBoard[0][2] === gameBoard[1][2] && gameBoard[0][2] === gameBoard[2][2]) ||

      // Check diagonals
      (gameBoard[0][0] !== "" && gameBoard[0][0] === gameBoard[1][1] && gameBoard[0][0] === gameBoard[2][2]) || 
      (gameBoard[0][2] !== "" && gameBoard[0][2] === gameBoard[1][1] && gameBoard[0][2] === gameBoard[2][0])
    ) {
      return true;
    }
    return false;
  };

  return { getPlayerOne, getPlayerTwo, getBoard, makeMove, winnerCheck };
};

newGameBtn.addEventListener("click", () => {
  location.reload()  
});

allBoxes.forEach(b => {
  const id = parseInt(b.id);
  let update = () => {
    let x, y;
    if (id <= 3) {
      x = 0;
    } else if (id <= 6) {
      x = 1;
    } else {
      x = 2;
    }
    if (id === 1 || id === 4 || id === 7) {
      y = 0;
    } else if (id === 2 || id === 5 || id === 8) {
      y = 1;
    } else {
      y = 2;
    }
    currentGame.makeMove(x, y, currentPlayer);
  };

  let move = () => {
    if(active){
    b.style.filter = "invert(1)";
    if (currentPlayer === 1) {
      b.style.backgroundImage = "url('./images/oIcon.png')";
      b.style.border="solid 1px black"
      displayedPlayer.textContent = `${currentGame.getPlayerTwo().name}'s Turn`;
      update();
      if(currentGame.winnerCheck()){
        displayedPlayer.textContent = `${currentGame.getPlayerOne().name} has Won!`;
        active=false;
      }
      currentPlayer = 2;
    } else {
      b.style.backgroundImage = "url('./images/xIcon.png')";
      b.style.border="solid 1px black";
      displayedPlayer.textContent = `${currentGame.getPlayerOne().name}'s Turn`;
      update();
      if(currentGame.winnerCheck()){
        displayedPlayer.textContent = `${currentGame.getPlayerTwo().name} has Won!`;
        active=false;
      }
      currentPlayer = 1;
    }
    b.removeEventListener("click", move); // event listener works only one time
    if(turns===9){
      displayedPlayer.textContent = `It's a Tie!`;
    }
  };
}
  b.addEventListener("click", move); 
});

currentGame = makeGame("Player One", "Player Two");
