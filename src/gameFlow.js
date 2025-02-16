import { Coordinates } from "./gameboard.js";
import { Player } from "./playerHandler.js";

export const gameFolw = (function () {
    let turn = true;
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

        switch (state) {
            case "miss":
                cell.style.backgroundColor = "rgba(0, 90, 226, 0.67)";
                cell.classList.add("miss")
                changeTurn(); 
                return state;
            case "clicked":
                return state;
            case "sunk":

                cell.style.backgroundColor = "red"; 
                changeTurn()
                return state
            default:
                cell.style.backgroundColor = "rgba(255, 94, 0, 0.67)";
                cell.classList.add("hitted")
                changeTurn()
                return state
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