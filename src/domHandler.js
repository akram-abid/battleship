import { Player } from "./playerHandler.js";
import { Coordinates, gameboard } from "./gameboard.js";
import { gameFolw } from "./gameFlow.js";

let shipsName = ["twoed", "threed-one", "threed-two", "foured", "fived"];

export const domHandler = (function () {
    const body = document.querySelector("body");
    let firstPlayer;
    let secondPlayer;
    let alreadyClicked = [];
    let vsComputer = true;
    let finishPlacing = false;
    let shipSelected = 0;
    let horizontal = true;

    const vsCopmuterPlayers = (first, second) => {
        firstPlayer = Player(first);
        secondPlayer = Player(second);

        console.log("this is the player you want ", firstPlayer);
        createBoard(firstPlayer, "first-player");
        createBoard(secondPlayer, "second-player");
    };

    const disactivatecells = () => {
        if (vsComputer) {
            const cells = document.querySelectorAll(".first-player");
            cells.forEach((div) => (div.style.pointerEvents = "none"));
        }
    };

    const createBoardForPlacing = () => {
        const buttonsHolder = document.createElement("div");
        buttonsHolder.classList.add("buttons-holder");

        const randomize = document.createElement("button");
        randomize.innerHTML = "randomize";
        buttonsHolder.appendChild(randomize);

        randomize.addEventListener("click", () => {
            gameFolw.firstPlayer.board.reinitalizeBorad();
            clearColors(true);
            gameFolw.placeShipsFirstPlayerRandomly();
            colorCells(true);
            console.log(gameFolw.firstPlayer.board.board);
            declineSelected(true);
        });

        const clear = document.createElement("button");
        clear.innerHTML = "clear";
        buttonsHolder.appendChild(clear);

        clear.addEventListener("click", () => {
            gameFolw.firstPlayer.board.reinitalizeBorad();
            clearColors(true);
            declineSelected();
            finishPlacing = false;
        });

        const direction = document.createElement("button");
        direction.innerHTML = "horizonatal";
        direction.addEventListener("click", (e) => {
            horizontal = !horizontal;
            if (horizontal) {
                e.target.innerHTML = "horizintal";
            } else {
                e.target.innerHTML = "vertical";
            }
        });
        buttonsHolder.appendChild(direction);

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
                cell.classList.add("placing");
                cell.classList.add(`cell-${i}-${j}`);
                let cords = Coordinates(i, j);
                cell.dataset.value = JSON.stringify(cords);
                board.appendChild(cell);
                cell.addEventListener("click", (e) => {
                    if (!finishPlacing) {
                        let placeState = gameFolw.firstPlayer.board.validatePlacing(
                            gameFolw.firstPlayer.board.ships[shipSelected],
                            JSON.parse(e.target.dataset.value),
                            horizontal
                        );
                        if(placeState){
                            colorCells(true);
                            declineSelected(false);
                            defineSelected(
                                document.querySelector(
                                    `.${gameFolw.firstPlayer.board.ships[shipSelected].name}`
                                )
                            );
                            shipSelected += 1;
                            if(shipSelected == 5){
                                finishPlacing = true
                                shipSelected --
                            }                            
                        }
                    }
                    console.log(gameFolw.firstPlayer.board.board)
                });

                cell.addEventListener("mouseenter", (e) => {
                    let cellToHover;
                    if (horizontal) {
                        clearColors(true, true);
                        for (
                            let i = 0; i < gameFolw.firstPlayer.board.ships[shipSelected].lenght;
                            i++
                        ) {
                            let coords = JSON.parse(e.target.dataset.value);
                            cellToHover = document.querySelector(
                                `.cell-${coords.x}-${coords.y + i}.placing.cell`
                            );
                            if (cellToHover) {
                                cellToHover.style.backgroundColor =
                                    "rgba(252, 192, 64, 0.59)";
                            }
                        }
                    } else {
                        clearColors(true, true);
                        for (
                            let i = 0;
                            i <
                            gameFolw.firstPlayer.board.ships[shipSelected]
                                .lenght;
                            i++
                        ) {
                            let coords = JSON.parse(e.target.dataset.value);
                            cellToHover = document.querySelector(
                                `.cell-${coords.x + i}-${coords.y}.placing.cell`
                            );
                            if (cellToHover) {
                                cellToHover.style.backgroundColor =
                                    "rgba(255, 94, 0, 0.67)";
                            }
                        }
                    }
                });

                cell.addEventListener("mouseleave", () => {
                    clearColors(true, true);
                });
            }
        }
        const ships = document.createElement("div");
        ships.classList.add("ships");

        let newCell, ship;
        for (let k = 0; k < gameFolw.firstPlayer.board.ships.length; k++) {
            ship = document.createElement("div");
            ship.classList.add("ship");
            ship.classList.add(gameFolw.firstPlayer.board.ships[k].name);
            for (
                let r = 0;
                r < gameFolw.firstPlayer.board.ships[k].lenght;
                r++
            ) {
                newCell = document.createElement("div");
                newCell.classList.add("before-cell");
                ship.appendChild(newCell);
            }
            ships.appendChild(ship);
        }
        body.appendChild(ships);

        bodyContainer.appendChild(buttonsHolder);
        body.appendChild(bodyContainer);

        const start = document.createElement("button");
        start.innerHTML = "start the Game";
        start.classList.add("start");
        body.appendChild(start);

        defineSelected(
            document.querySelector(
                `.${gameFolw.firstPlayer.board.ships[shipSelected].name}`
            )
        );
    };

    const defineSelected = (row) => {
        row.style.backgroundColor = "rgba(116, 116, 116, 0.445)";
        row.style.padding = "6px";
        row.borderRadius = "6px";
    };

    const declineSelected = (random) => {
        let rows = document.querySelectorAll(".ship");
        rows.forEach((e) => {
            e.style.backgroundColor = "";
            e.style.padding = "";
            e.borderRadius = "";
        });
        if (!random) {
            defineSelected(
                document.querySelector(
                    `.${gameFolw.firstPlayer.board.ships[shipSelected].name}`
                )
            );
        }
    };

    const clearColors = (placing, hover) => {
        let wantedCell;
        for (let i = 0; i < gameFolw.firstPlayer.board.board.length; i++) {
            for (let j = 0; j < gameFolw.firstPlayer.board.board.length; j++) {
                if (placing) {
                    wantedCell = document.querySelector(
                        `.cell-${i}-${j}.placing`
                    );
                } else {
                    wantedCell = document.querySelector(
                        `.cell-${i}-${j}.first-player`
                    );
                }
                if (
                    !shipsName.includes(gameFolw.firstPlayer.board.board[i][j])
                ) {
                    wantedCell.style.backgroundColor = "";
                }
            }
        }

        if (!hover) {
            shipSelected = 0;
        }
    };

    const createBoard = function (boardPlayer, clas) {
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
                cell.dataset.value = firstPlayer;

                cell.addEventListener("click", (e) => {
                    console.log(e.target.style.backgroundColor == "");
                    if (e.target.style.backgroundColor == "") {
                        let firstattack = gameFolw.launchAttack(
                            Coordinates(i, j),
                            firstPlayer,
                            e.target
                        );
                        if (firstattack == "sunk") {
                            colorSunkShips(1);
                        }
                        handelClick(vsComputer, secondPlayer, firstattack);
                    }
                });

                disactivatecells();

                board.appendChild(cell);
            }
        }

        body.appendChild(bodyContainer);
    };

    const colorSunkShips = (player) => {
        let wantedCell, currentShip;
        if (player == 1) {
            for (let s = 0; s < gameFolw.secondPlayer.board.ships.length; s++) {
                currentShip = gameFolw.secondPlayer.board.ships[s];
                if (currentShip.sunk == true) {
                    for (let i = 0; i < firstPlayer.board.board.length; i++) {
                        for (
                            let j = 0;
                            j < firstPlayer.board.board[i].length;
                            j++
                        ) {
                            if (
                                gameFolw.secondPlayer.board.board[i][j] ==
                                currentShip.name
                            ) {
                                wantedCell = document.querySelector(
                                    `.cell-${i}-${j}.second-player`
                                );
                                wantedCell.style.backgroundColor = "red";
                            }
                        }
                    }
                }
            }
        } else {
            for (let s = 0; s < gameFolw.firstPlayer.board.ships.length; s++) {
                currentShip = gameFolw.firstPlayer.board.ships[s];
                if (currentShip.sunk) {
                    for (
                        let i = 0;
                        i < gameFolw.firstPlayer.board.board.length;
                        i++
                    ) {
                        for (
                            let j = 0;
                            j < gameFolw.firstPlayer.board.board[i].length;
                            j++
                        ) {
                            if (
                                gameFolw.firstPlayer.board.board[i][j] ==
                                currentShip.name
                            ) {
                                wantedCell = document.querySelector(
                                    `.cell-${i}-${j}.first-player`
                                );
                                wantedCell.style.backgroundColor = "red";
                            }
                        }
                    }
                }
            }
        }
    };

    const handelClick = (vsComputer, secondPlayer, firstattack) => {
        if (vsComputer && firstattack != "clicked") {
            let firstNum, secondNum, wantedCell, attack;
            do {
                firstNum = Math.floor(Math.random() * 10);
                secondNum = Math.floor(Math.random() * 10);
                wantedCell = document.querySelector(
                    `.cell-${firstNum}-${secondNum}.first-player`
                );
                if (!have(alreadyClicked, Coordinates(firstNum, secondNum))) {
                    alreadyClicked.push(Coordinates(firstNum, secondNum));
                    attack = gameFolw.launchAttack(
                        Coordinates(firstNum, secondNum),
                        secondPlayer,
                        wantedCell
                    );
                    if (attack == "sunk") {
                        colorSunkShips(2);
                    }
                } else {
                    attack = "clicked";
                }

            } while (attack == "clicked");
        }
    };

    const colorCells = (placing) => {
        let wantedCell;
        const shipNames = gameFolw.firstPlayer.board.ships.map(
            (ship) => ship.name
        );
        for (let i = 0; i < gameFolw.firstPlayer.board.board.length; i++) {
            for (let j = 0; j < gameFolw.firstPlayer.board.board.length; j++) {
                if (
                    shipNames.includes(gameFolw.firstPlayer.board.board[i][j])
                ) {
                    if (placing) {
                        wantedCell = document.querySelector(
                            `.cell-${i}-${j}.placing`
                        );
                    } else {
                        wantedCell = document.querySelector(
                            `.cell-${i}-${j}.first-player`
                        );
                    }
                    wantedCell.style.backgroundColor =
                        "rgba(253, 215, 0, 0.73)";
                }
            }
        }
    };

    const showShips = () => {
        console.log(gameFolw.placeComputerships());
        colorCells(false);
    };

    return {
        createBoard,
        vsCopmuterPlayers,
        showShips,
        createBoardForPlacing,
    };
})();

function have(array, cords) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].x == cords.x && array[i].y == cords.y) {
            return true;
        }
    }
    return false;
}