function gameboard(){
    return {
        board
    }
}

function createBoard(){
    let board = []
    for(let i = 0; i < 10; i ++){
        for(let j = 0; j < 10; j ++){
            board[i][j] = null;
        }
    }
    return board
}