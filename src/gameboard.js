import {Ship} from './shipHandler.js'

export function gameboard(board = createBoard(), ships = createShips()) {
    return {
        ships,
        board,
        validatePlacing: function (ship, coordinates, horizantal) {
            if (horizantal) {
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
                    }
                }
                return false;
            } else {
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
                            board[coordinates.x][coordinates.y + 1] = ship.name;
                        }
                        return true;
                    }
                }
                return false;
            }
        },
        recieveAttack: function (coords) {
            if(board[coords.x][coords.y] == null){
                board[coords.x][coords.y] = "miss"
                return "miss"
            }else{
                for(let i = 0; i< 5; i++){
                    if(ships[i].name == board[coords.x][coords.y]){
                        ships[i].hit();
                        if(ships[i].isSunk()){
                            return "sunk"
                        }
                        return "on-water"
                    }
                }
            }
        },
    };
}

/*
const ship = Ship("c1", 4, 0, false);
const coords = Coordinates(7, 7);
const baord = gameboard();
ship.hit()
ship.hit()
console.log(ship.hits)
*/

function Coordinates(x, y) {
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
            board[i][j] = null;
        }
    }
    return board;
}

function checkSpotEmpty(coordinates, lenght, array, horizantal) {
    if (horizantal) {
        for (let i = 0; i < length; i++) {
            if (array[coordinates.x + i][coordinates.y] != null) {
                return false;
            }
        }
    } else {
        for (let i = 0; i < length; i++) {
            if (array[coordinates.x][coordinates.y + i] != null) {
                return false;
            }
        }
    }
}

function createShips(){
    let ships = []
    ships[0] = Ship("twoed", 2, 0, false);
    ships[1] = Ship("threed-one", 3, 0, false);
    ships[2] = Ship("threed-two", 3, 0, false);
    ships[3] = Ship("foured", 4, 0, false);
    ships[4] = Ship("fived", 5, 0, false);

    return ships
}