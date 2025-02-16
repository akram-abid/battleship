import { Ship } from "./shipHandler.js";

let shipsName = ["twoed", "threed-one", "threed-two", "foured", "fived"];

export function gameboard(board = createBoard(), ships = createShips()) {
    return {
        ships,
        board,

        reinitalizeBorad: function () {
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    board[i][j] = 0
                }
            }
            console.log("in game board ", board);
        },

        upadteBoard: function (coords, val) {
            board[coords.x][coords.y] = val;
        },


        validatePlacing: function (ship, coordinates, horizantal) {
            if (horizantal) {
                if (coordinates.y <= 10 - ship.lenght) {
                    if (
                        checkSpotEmpty(
                            coordinates,
                            ship.lenght,
                            board,
                            horizantal
                        )
                    ) {
                        for (let i = 0; i < ship.lenght; i++) {
                            board[coordinates.x][coordinates.y + i] = ship.name;
                        }
                        return true;
                    } else {
                        return false;
                    }
                }
                return false;
            } else {
                if (coordinates.x <= 10 - ship.lenght) {
                    if (
                        checkSpotEmpty(
                            coordinates,
                            ship.lenght,
                            board,
                            horizantal
                        )
                    ) {
                        for (let i = 0; i < ship.lenght; i++) {
                            board[coordinates.x + i][coordinates.y] = ship.name;
                        }
                        return true;
                    } else {
                        return false;
                    }
                }
                return false;
            }
        },
        recieveAttack: function (coords) {
            console.log("the board ", board);
            console.log(
                `attcking ${coords.x} ${coords.y} and it have ${
                    board[coords.x][coords.y]
                }`
            );
            if (board[coords.x][coords.y] === 0) {
                board[coords.x][coords.y] = "miss";
                return "miss";
            } else {
                if (!shipsName.includes(board[coords.x][coords.y])) {
                    return "clicked";
                }
                for (let i = 0; i < 5; i++) {
                    if (ships[i].name == board[coords.x][coords.y]) {
                        ships[i].hit();
                        if (ships[i].isSunk()) {
                            console.log(
                                "i am going to return sunk ok? ",
                                ships[i].sunk
                            );
                            ships[i].sunked();
                            console.log(
                                "i am going to return sunk ok? ",
                                ships[i].sunk
                            );
                            return "sunk";
                        }
                        return "hitted";
                    }
                }
            }
        },
    };
}

export function Coordinates(x, y) {
    return {
        x,
        y,
    };
}

export function createBoard() {
    let board = [];

    for (let i = 0; i < 10; i++) {
        board[i] = [];
        for (let j = 0; j < 10; j++) {
            board[i][j] = 0;
        }
    }
    return board;
}

function checkSpotEmpty(coordinates, lenght, array, horizantal) {
    if (horizantal) {
        for (let i = 0; i < lenght; i++) {
            if (array[coordinates.x][coordinates.y + i] != 0) {
                return false;
            }
        }
        return true;
    } else {
        for (let i = 0; i < lenght; i++) {
            if (array[coordinates.x + i][coordinates.y] != 0) {
                return false;
            }
        }
        return true;
    }
}

function createShips() {
    let ships = [];
    ships[0] = Ship("twoed", 2, 0, false);
    ships[1] = Ship("threed-one", 3, 0, false);
    ships[2] = Ship("threed-two", 3, 0, false);
    ships[3] = Ship("foured", 4, 0, false);
    ships[4] = Ship("fived", 5, 0, false);

    return ships;
}
/*
console.log();
console.log();
console.log();
console.log();

const ship = Ship("towed", 5, 0, false);
const board = gameboard();

board.upadteBoard(Coordinates(5, 3), "amigo");
board.upadteBoard(Coordinates(6, 3), "amigo");
board.upadteBoard(Coordinates(7, 3), "amigo");

console.log(board);
console.log(checkSpotEmpty(Coordinates(0, 3), 7, board.board, false));
console.log(board.validatePlacing(ship, Coordinates(4, 4), false));
console.log(board);*/
