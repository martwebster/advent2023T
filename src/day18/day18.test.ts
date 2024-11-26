import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { adjust, calculateArea, convertCoodsToString, getCoodinates, parseMovement } from './day18';
import * as extensions from '../utility/extensions';
extensions.apply();
describe('day 18 - part2', () => {
    test('Simple grid', () => {

        const cood = getCoodinates([
            { direction: "L", length: 4 },
            { direction: "D", length: 2 },
            { direction: "R", length: 4 },
            { direction: "U", length: 2 }
        ])
        const matrix = adjust(cood, 1, 1)
        expect(calculateArea(matrix)).toBe(8)
    })

    test('Parse movement grid', () => {
        const movement = parseMovement("R 6 (#70c710)");
        expect(movement.direction).toBe("R")
        expect(movement.length).toBe(6)
    })

    test('Area sample', () => {
        const data = readTestData('./src/day18/day18.sample.txt');
        const movements = data.map(parseMovement);
        expect(movements[0].direction).toBe("R")
        expect(movements[0].length).toBe(6)

        const perimeter = movements.sumOf(item => item.length);
        const cood = getCoodinates(movements);
        const string = convertCoodsToString(cood);
        const adjusted = adjust(cood, 1, 1)
        const area = calculateArea(adjusted)
        expect(area).toBe(62);

    })
})
