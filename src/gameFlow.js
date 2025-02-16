import { Coordinates } from "./gameboard.js";
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
            return;
        }
        let currentPlayer, opponentPlayer, currentCells, opponentCells;
        let currentPlayerClass;

        // Determine current and opponent players based on turn
        console.log(`coords ${coords.x}-${coords.y}`);
        if (turn) {
            console.log("1 player turn");
            currentPlayerClass = "first-player";
            currentPlayer = firstPlayer;
            opponentPlayer = secondPlayer;
            currentCells = player1cells;
            opponentCells = player2cells;
        } else {
            console.log("2 player turn");
            currentPlayer = secondPlayer;
            currentPlayerClass = "second-player";
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
        console.log("Attack state:", state +"/////////////////////////////////////:");

        switch (state) {
            case "miss":
                console.log("i missed it fuck")
                cell.style.backgroundColor = "rgba(0, 90, 226, 0.67)"; // Missed attack color
                cell.classList.add("miss")
                changeTurn(); // Switch turn after a miss
                return state;
            case "clicked":
                console.log("should be green")
                //cell.style.backgroundColor = "rgba(0, 90, 22, 0.67)"; // Mark as already clicked
                return state; // Do not change turn
            case "sunk":

                console.log("should be red===================here plyers ",opponentPlayer)
                cell.style.backgroundColor = "red"; // Hit indication
                // Optional: Add logic for ship sinking (e.g., check for game over)
                changeTurn()
                return state
                break;
            default:
                console.log("should be hitted right")
                cell.style.backgroundColor = "rgba(255, 94, 0, 0.67)";
                cell.classList.add("hitted")
                changeTurn()
                return state
                break;
        }
    };

    const placeShipsFirstPlayerRandomly = () => {
        let randX, randY;
        let state;
        const ships = firstPlayer.board.ships;
        for (let i = 0; i < ships.length; i++) {
            do {
                randX = Math.floor(Math.random() * 10);
                randY = Math.floor(Math.random() * 10);
                state = firstPlayer.board.validatePlacing(
                    ships[i],
                    Coordinates(randX, randY),
                    Math.random()<0.5,
                );
            } while (!state);
        }
        console.log("i am trying to place////////////////////////////////// ", state)
        return state
    };

    const placeComputerships = () => {
        let randX, randY;
        let state;
        const ships = secondPlayer.board.ships;
        for (let i = 0; i < ships.length; i++) {
            do {
                randX = Math.floor(Math.random() * 10);
                randY = Math.floor(Math.random() * 10);
                state = secondPlayer.board.validatePlacing(
                    ships[i],
                    Coordinates(randX, randY),
                    Math.random()<0.5,
                );
            } while (!state);
        }
        console.log("i am trying to place////////////////////////////////// ", state)
        return state
    };

    return {
        changeTurn,
        getTurn,
        launchAttack,
        placeShipsFirstPlayerRandomly,
        placeComputerships,
        firstPlayer,
        secondPlayer,
    };
})();

const first = Player("player1");
/*
console.log(gameFolw.firstPlayer.board.board);
gameFolw.placeShipsRandomly()
console.log("last one ",gameFolw.firstPlayer.board.board);*/
