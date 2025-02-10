import { Player } from "./playerHandler.js";

export const gameFolw = (function () {
    let turn = true;
    let vsComputer = false;
    const firstPlayer = Player("player1");
    const secondPlayer = Player("player2");
    const player1cells = document.querySelectorAll(".first-player");
    const player2cells = document.querySelectorAll(".second-player");

    const changeTurn = () => {
        turn = !turn;
    };

    const getTurn = () => {
        return turn;
    };

    const launchAttack = (coords, player, cell) => {
        if (!player || !cell) {
            console.log("null  null")
            return
        }
        let currentPlayer, opponentPlayer, currentCells, opponentCells;
        let currentPlayerClass 
        
        // Determine current and opponent players based on turn
        console.log(`coords ${coords.x}-${coords.y}`)
        if (turn) {
            console.log("1 player turn")
            currentPlayerClass = "first-player"
            currentPlayer = firstPlayer;
            opponentPlayer = secondPlayer;
            currentCells = player1cells;
            opponentCells = player2cells;
        } else {
            console.log("2 player turn")
            currentPlayer = secondPlayer;
            currentPlayerClass = "second-player"
            opponentPlayer = firstPlayer;
            currentCells = player2cells;
            opponentCells = player1cells;
        }

        // Validate if the attack is on the correct player's board
        if (player.name === currentPlayer.name) {
            console.log("Invalid attack: Cannot attack your own board");
            return;
        }

        // Disable opponent's board and enable current player's board
        opponentCells.forEach((div) => (div.style.pointerEvents = "none"));
        currentCells.forEach((div) => (div.style.pointerEvents = "auto"));

        // Attack logic
        const state = opponentPlayer.board.recieveAttack(coords);
        //console.log("Attack state:", state +"/////////////////////////////////////:");

        switch (state) {
            case "miss":
                cell.style.backgroundColor = "rgba(0, 90, 226, 0.67)"; // Missed attack color
                changeTurn(); // Switch turn after a miss
                return state;
            case "clicked":
                //cell.style.backgroundColor = "rgba(0, 90, 22, 0.67)"; // Mark as already clicked
                return state; // Do not change turn
            case "sunk":
                cell.style.backgroundColor = "red"; // Hit indication
                // Optional: Add logic for ship sinking (e.g., check for game over)
                break;
            default:
                cell.style.backgroundColor = "red"; // Hit indication
                break;
        }
    };

    return {
        changeTurn,
        getTurn,
        launchAttack,
    };
})();