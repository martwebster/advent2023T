
import * as extensions from '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { getFirstAndLastNumbers, getLineNumber, sumLineNumbers, sumLineNumbersWithWord } from './day1';


extensions.apply();

describe('day 1 - part1', () => {
    test('readLines', () => {
        expect(getLineNumber('1abc2')).toBe(12);
    })

    test('sample', () => {
        const data = readTestData('./src/day1/day1.sample.txt');
        expect(sumLineNumbers(data)).toBe(142);
    })

    test('part1', () => {
        const data = readTestData('./src/day1/day1.txt');
        expect(sumLineNumbers(data)).toBe(56042);
    })
})

describe('day 1 - part2', () => {
    test('getFirstAndLastNumbers', () => {
        expect(getFirstAndLastNumbers('two1nine')).toBe(29);
        expect(getFirstAndLastNumbers('eightwothree')).toBe(83);
    })

    test('sample', () => {
        const data = readTestData('./src/day1/day1.sample2.txt');
        expect(sumLineNumbersWithWord(data)).toBe(281);
    })

    // test('part2', () => {
    //     const data = readTestData('./src/day1/day1.txt');
    //     expect(sumLineNumbersWithWord(data)).toBe(55358);
    // })
})

