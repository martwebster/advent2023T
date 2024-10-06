
import * as extensions from '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { getLineNumber, sumLineNumbers } from './day1';


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

