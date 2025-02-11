import { Player } from "./playerHandler.js";
import { Coordinates } from "./gameboard.js";
import { gameFolw } from "./gameFlow.js";
import explosion from "./images/explosion.png";

export const domHandler = (function () {
    const body = document.querySelector("body");
    let firstPlayer;
    let secondPlayer;

    let vsComputer = true;

    
    const vsCopmuterPlayers = (first, second) => {
        firstPlayer = Player(first);
        secondPlayer = Player(second);

        console.log("this is the player you want ", firstPlayer);
        createBoard(firstPlayer, "first-player");
        createBoard(secondPlayer, "second-player");
    };

    const disactivatecells = () => {
        if(vsComputer){
            const cells = document.querySelectorAll(".first-player");
            cells.forEach((div) => (div.style.pointerEvents = "none"));
        }
    }

    const createBoard = function (boardPlayer, clas) {
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
                cell.classList.add(clas);
                cell.classList.add(`cell-${i}-${j}`);
                cell.dataset.value = boardPlayer;

                const img = document.createElement("img");
                img.src = explosion;
                cell.addEventListener("click", (e) => {
                    console.log(e.target.style.backgroundColor == "")
                    if (e.target.style.backgroundColor == ""){
                        let firstattack = gameFolw.launchAttack(
                            Coordinates(i, j),
                            boardPlayer,
                            e.target
                        );
                        console.log("state ",firstattack + "//////////////////////")
                        handelClick(e,i,j, boardPlayer, vsComputer, secondPlayer, firstattack);
                    }
                });

                disactivatecells()

                board.appendChild(cell);
            }
        }

        body.appendChild(bodyContainer);
    };

    return {
        createBoard,
        vsCopmuterPlayers,
    };
})();

function handelClick(e, i, j, boardPlayer, vsComputer, secondPlayer, firstattack){
    if (vsComputer && firstattack != "clicked") {
        let firstNum, secondNum, wantedCell, attack;
        do {
            firstNum = Math.floor(Math.random() * 10);
            secondNum = Math.floor(Math.random() * 10);
            wantedCell = document.querySelector(`.cell-${firstNum}-${secondNum}.first-player`);
            attack = gameFolw.launchAttack(
                Coordinates(firstNum, secondNum),
                secondPlayer,
                wantedCell
            );
            console.log("second attack state ",attack+"////////////////")
        } while (attack === "clicked");
    }
}