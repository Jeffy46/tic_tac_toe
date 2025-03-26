let makeGame = (name1, name2) => {
    const gameBoard = [["","",""],["","",""],["","",""]];
    let getBoard = () =>{
        return gameBoard;
    }
    let makePlayer = (n) =>{
        let score = 0;
        const name = n;
        let increaseScore = () => score++;
        return {name, score, increaseScore}
    }
    let playerOne = makePlayer(name1)
    let playerTwo = makePlayer(name2)
   
    let makeMove = (x, y, player) =>{
        if(player === "playerOne"){
            gameBoard[x][y]="O";
        }else{
            gameBoard[x][y]="X";
        }
    }

    return {playerOne,playerTwo,getBoard,makeMove}
};
