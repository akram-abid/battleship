import { gameboard } from "./gameboard.js"

export function Player(name, board = gameboard()){
    return {
        name,
        board,
        reZeroBoard: function (){
            board.reinitalizeBorad()
        }
    }
}