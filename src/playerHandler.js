import { gameboard } from "./gameboard.js"

function Player(name, auto, board = gameboard()){
    return {
        name,
        auto,
        board,
    }
}