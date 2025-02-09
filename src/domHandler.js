import { Player } from "./playerHandler.js";
import { gameboard } from "./gameboard.js";
import { Coordinates } from "./gameboard.js";

export const domHandler = (function () {
    const body = document.querySelector("body");

    const createPlayers = (first, second) => {
        const firstPlayer = Player(first);
        const secondPlayer = Player(second);

        console.log("this is the player you want ", firstPlayer);

        createBoard(firstPlayer.board);
        createBoard(secondPlayer.board);
    };

    const createBoard = (boardPlayer) => {
        console.log("ok it is working");
        const bodyContainer = document.createElement("div");
        bodyContainer.classList.add("board-container");

        const playerName = document.createElement("p");
        playerName.classList.add("player-name");
        playerName.innerHTML = "AKRAM";
        bodyContainer.appendChild(playerName);

        const board = document.createElement("div");
        board.classList.add("board");
        bodyContainer.appendChild(board);

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.value = boardPlayer.board[i][j];
                cell.addEventListener("click", (e) => {
                    console.log(boardPlayer.recieveAttack(Coordinates(i, j)));
                });
                board.appendChild(cell);
            }
        }

        body.appendChild(bodyContainer);
    };

    return {
        createBoard,
        createPlayers,
    };
})();
