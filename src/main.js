import "./style.css";
import { domHandler } from "./domHandler.js";

const body = document.querySelector("body")

domHandler.createBoardForPlacing("placing")

const start = document.querySelector(".start")
console.log(start)

start.addEventListener("click", () => {
    body.innerHTML = ""
    domHandler.vsCopmuterPlayers("akram", "mustapha")
    domHandler.showShips();
})