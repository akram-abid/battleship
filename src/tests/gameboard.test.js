
import test from 'node:test';
import { createBoard, gameboard } from '../gameboard.js';
import {Ship} from '../shipHandler.js'
const board = gameboard()

test("game board function creates a 10x10 grid filled with null", () => {
    const board = createBoard();
    
    expect(board.length).toBe(10);

    board.forEach(row => {
        expect(row.length).toBe(10);
    });

    board.forEach(row => {
        row.forEach(cell => {
            expect(cell).toBe(null);
        });
    });
});
