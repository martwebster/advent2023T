
import * as extensions from '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { Grid, Item } from './day3';



extensions.apply();

describe('day 3', () => {
    test('parse', () => {
        const items = Item.parse(["467..114.."]);
        expect(items.length).toBe(2);
        expect(items[0].row).toBe(0);
        expect(items[0].startCol).toBe(0);
        expect(items[0].value).toBe(467);


        expect(items[1].row).toBe(0);
        expect(items[1].startCol).toBe(5);
        expect(items[1].value).toBe(114);
    })

    test('parse2', () => {
        const items = Item.parse([".103."]);
        expect(items.length).toBe(1);
    })


    test('grid', () => {
        const grid = new Grid(["467..114.2"]);
        expect(grid.items.length).toBe(3);

        const boundry = grid.getItemOuterBoundry(grid.items[0]);
        expect(boundry.length).toBe(1);

        const boundry2 = grid.getItemOuterBoundry(grid.items[1]);
        expect(boundry2.length).toBe(2);

        const boundry3 = grid.getItemOuterBoundry(grid.items[2]);
        expect(boundry3.length).toBe(1);
    })

    test('grid 2', () => {
        const grid = new Grid(["467..114.2", ".........."]);
        expect(grid.items.length).toBe(3);

        const boundry = grid.getItemOuterBoundry(grid.items[0]);
        expect(boundry.length).toBe(5);

        const boundry2 = grid.getItemOuterBoundry(grid.items[1]);
        expect(boundry2.length).toBe(7);

        const boundry3 = grid.getItemOuterBoundry(grid.items[2]);
        expect(boundry3.length).toBe(3);
    })
    test('grid3', () => {
        const grid = new Grid(["....", ".21.", "...."]);
        expect(grid.items.length).toBe(1);

        const boundry = grid.getItemOuterBoundry(grid.items[0]);
        expect(boundry.length).toBe(10);
    })

    test('Sample', () => {
        const data = readTestData('./src/day3/day3.sample.txt');
        const grid = new Grid(data)
        const bondry = grid.getItemOuterBoundry(grid.items[0])

        expect(bondry.length).toBe(5)
    })

    test('Part 1', () => {
        const data = readTestData('./src/day3/day3.txt');
        expect(new Grid(data).getPartNumber()).toBe(560670)
    })

    test('Sample Part2', () => {
        const data = readTestData('./src/day3/day3.sample.txt');
        const grid2 = new Grid(data)
        const positions = grid2.getSymbolPositions("*");
        const outer = grid2.items[0].getOuterCells();

        const items = grid2.getItemsWithOuterPos(positions[0]);

        expect(grid2.sumGearRatios()).toBe(467835);
    })

    test('Part 2', () => {
        const data = readTestData('./src/day3/day3.txt');
        expect(new Grid(data).sumGearRatios()).toBe(91622824)
    })

})

