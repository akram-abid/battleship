import { Player } from "./playerHandler.js";

const gameFolw = (function () {
    let turn = true;
    let vsComputer = false;
    const firstPlayer = Player("player1");
    const secondPlayer = Player("player2");

    const changeTurn = () => {
        turn = !turn;
    };
    const getTurn = () => {
        return turn;
    };

    const launchAttack = (coords) => {
        if( turn ){
            firstPlayer.board.recieveAttack(coords)
            changeTurn()
        }else{
            secondPlayer.board.recieveAttack(coords)
            changeTurn()
        }
    };

    return {
        changeTurn,
        getTurn,
        launchAttack
    };
})();