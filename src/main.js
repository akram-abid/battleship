import "./style.css";
import { domHandler } from "./domHandler.js";
import { gameFolw } from "./gameFlow.js";
//import { gameFolw } from "./gameFlow.js";

//domHandler.vsCopmuterPlayers("akram", "mustapha")
//domHandler.showShips();

domHandler.createBoardForPlacing("placing")
console.log(gameFolw.firstPlayer.board.board)

