
import * as extensions from '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { Crucible, HeatCell, createGrid, goFotIt, isFinished, move } from './day10';




extensions.apply();

describe('day 10', () => {
    const newCrucible = (x: number, y: number): Crucible => {
        return {
            xPos: x,
            yPos: y,
            heat: 0,
            streak: 0,
            pos: [],
            lastMovement: ""
        }
    }

    test('first move', () => {
        const crucible = newCrucible(0, 0);
        const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        const result = move(createGrid(grid), crucible);

        expect(result.length).toBe(2);
        // right
        expect(result[0].xPos).toBe(1);
        expect(result[0].yPos).toBe(0);
        expect(result[0].yPos).toBe(0);
        expect(result[0].heat).toBe(2);

        expect(result[1].xPos).toBe(0);
        expect(result[1].yPos).toBe(1);
        expect(result[1].heat).toBe(4);

    });

    test('move all', () => {
        const crucible = newCrucible(1, 1);
        const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        const result = move(createGrid(grid), crucible);

        expect(result.length).toBe(4);

        //right
        expect(result[0].xPos).toBe(2);
        expect(result[0].yPos).toBe(1);

        //down
        expect(result[1].xPos).toBe(1);
        expect(result[1].yPos).toBe(2);

        //left
        expect(result[2].xPos).toBe(0);
        expect(result[2].yPos).toBe(1);

        //up
        expect(result[3].xPos).toBe(1);
        expect(result[3].yPos).toBe(0);
    });

    test('bottom right move', () => {
        const crucible = newCrucible(2, 2);
        const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        const result = move(createGrid(grid), crucible);

        expect(result.length).toBe(2);
        expect(result[0].xPos).toBe(1);
        expect(result[0].yPos).toBe(2);
        expect(result[1].xPos).toBe(2);
        expect(result[1].yPos).toBe(1);
    });

    test('no left back', () => {
        const crucible = newCrucible(0, 0);
        const grid = [[1, 2, 3]]
        var result = move(createGrid(grid), crucible);

        expect(result.length).toBe(1);
        expect(result[0].xPos).toBe(1);
        expect(result[0].yPos).toBe(0);

    });

    test('no right back', () => {
        const crucible = newCrucible(2, 0);
        const grid = [[1, 2, 3]]
        var result = move(createGrid(grid), crucible);

        expect(result.length).toBe(1);
        expect(result[0].xPos).toBe(1);
        expect(result[0].yPos).toBe(0);
        expect(result[0].lastMovement).toBe("L")

        result = move(createGrid(grid), result[0]);
        expect(result.length).toBe(1);
        expect(result[0].xPos).toBe(0);
        expect(result[0].yPos).toBe(0);
    });

    test('max 3 right', () => {
        const crucible = newCrucible(0, 0);
        const grid = createGrid([[1, 2, 3, 4, 5], [5, 6, 7, 8, 9]])
        var crucibles = move(grid, crucible);
        var crucibles = move(grid, crucibles[0]);
        var crucibles = move(grid, crucibles[0]);
        var crucibles = move(grid, crucibles[0]);

        expect(crucibles.length).toBe(1);
        expect(crucibles[0].xPos).toBe(3);
        expect(crucibles[0].yPos).toBe(1);
        expect(crucibles[0].lastMovement).toBe("D");
        //expect(crucibles[0].streak).toBe(1);
        console.log(crucibles);
    });

    test('4 corners', () => {
        const grid = createGrid([[1, 2], [3, 4]]);
        var crucible = newCrucible(0, 0);
        crucible.streak = 3;
        crucible.lastMovement = "D";

        var crucibles = move(grid, crucible);
        expect(crucibles.length).toBe(1);
        expect(crucibles[0].xPos).toBe(1);
        expect(crucibles[0].yPos).toBe(0);
        expect(crucibles[0].lastMovement).toBe("R");

        var crucible = newCrucible(1, 0);
        crucible.streak = 3;
        crucible.lastMovement = "L";

        crucibles = move(grid, crucible);
        expect(crucibles.length).toBe(1);
        expect(crucibles[0].xPos).toBe(1);
        expect(crucibles[0].yPos).toBe(1);
        expect(crucibles[0].lastMovement).toBe("D");

        var crucible = newCrucible(0, 1);
        crucible.streak = 3;
        crucible.lastMovement = "U";

        crucibles = move(grid, crucible);
        expect(crucibles.length).toBe(1);
        expect(crucibles[0].xPos).toBe(1);
        expect(crucibles[0].yPos).toBe(1);
        expect(crucibles[0].lastMovement).toBe("R");
    });

    test('finished', () => {
        const grid = createGrid([[1, 2], [3, 4]]);
        var crucible = newCrucible(1, 1);
        expect(isFinished(grid, crucible)).toBe(true);
    });

    test('go', () => {
        const grid = createGrid([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
        const result = goFotIt(grid);
        expect(result).toBe(20);
    });

    test('sample', () => {
        const data = readTestData('./src/day10/day10.txt');
        const lines = data.map(line => line.split(""));
        const grid = createGrid(lines.map(line => line.map(ch => Number(ch))))
        const result = goFotIt(grid);
        expect(result).toBe(102);

    });

    test('part 1', () => {
        const data = readTestData('./src/day10/day10.data.txt');
        const lines = data.map(line => line.split(""));
        const grid = createGrid(lines.map(line => line.map(ch => Number(ch))))
        const result = goFotIt(grid);
        expect(result).toBe(635);
    });


});