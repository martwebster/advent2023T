
import * as extensions from '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { countIds, Game, powerGame } from './day2';


extensions.apply();

describe('day 2', () => {
    test('parse', () => {
        const game = Game.parse("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green");
        expect(game.id).toBe(1);
        expect(game.maxBlue).toBe(6)
        expect(game.maxGreen).toBe(2)
        expect(game.maxRed).toBe(4)
        expect(game.isValid(12, 13, 14)).toBe(true)
    })

    test('Count ids: sample', () => {
        const data = readTestData('./src/day2/day2.sample.txt');
        expect(countIds(data)).toBe(8);
    })

    test('Count ids: part 1', () => {
        const data = readTestData('./src/day2/day2.txt');
        expect(countIds(data)).toBe(2632);
    })


    test('Power Game: sample', () => {
        const data = readTestData('./src/day2/day2.sample.txt');
        expect(powerGame(data)).toBe(2286);
    })

    test('Power: part 2', () => {
        const data = readTestData('./src/day2/day2.txt');
        expect(powerGame(data)).toBe(69629);
    })


})

