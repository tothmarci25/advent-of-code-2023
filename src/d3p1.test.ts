import { describe, expect, test } from '@jest/globals';
import {
  PartNumber,
  Position,
  distance,
  getPartNumbersAndSymbols,
  hasAdjacentSymbol,
  sumPartNumbers,
} from './d3p1.lib';

describe('d3p1', () => {
  test('get distance of two position', () => {
    expect(distance([1, 2], [1, 3])).toBe(1);
    expect(distance([1, 3], [1, 2])).toBe(1);
    expect(distance([1, 3], [2, 3])).toBe(1);
    expect(distance([1, 3], [0, 3])).toBe(1);
    expect(distance([1, 3], [0, 2]) < 2).toBe(true);
    expect(distance([1, 3], [0, 4]) < 2).toBe(true);
    expect(distance([1, 3], [2, 4]) < 2).toBe(true);
    expect(distance([1, 3], [2, 2]) < 2).toBe(true);
    expect(distance([1, 3], [2, 1]) < 2).toBe(false);
  });

  test('get sum of part numbers', () => {
    const partNumber: PartNumber = {
      number: 25,
      positions: [
        [1, 1],
        [1, 2],
      ],
    };
    const symbol: Position = [2, 1];
    expect(sumPartNumbers([partNumber], [symbol])).toBe(25);
  });

  test('has adjacent symbol', () => {
    const position: Position = [3, 4];
    const symbols: Position[] = [
      [3, 3],
      [4, 5],
      [6, 8],
      [9, 2],
    ];

    expect(hasAdjacentSymbol(position, symbols)).toBe(true);
  });

  test('has NOT adjacent symbol', () => {
    const position: Position = [3, 4];
    const symbols: Position[] = [
      [4, 6],
      [6, 8],
      [9, 2],
    ];

    expect(hasAdjacentSymbol(position, symbols)).toBe(false);
  });

  describe('get part numbers and symbols', () => {
    test('there is only a single number in the line', () => {
      const input = '456';
      const result = getPartNumbersAndSymbols(input, 0);
      expect(result.partNumbers[0].number).toBe(456);
      expect(result.partNumbers[0].positions).toStrictEqual([
        [0, 0],
        [0, 1],
        [0, 2],
      ]);
    });

    test('there is only a single number in the line', () => {
      const input = '4567';
      const result = getPartNumbersAndSymbols(input, 1);
      expect(result.partNumbers[0].number).toBe(4567);
      expect(result.partNumbers[0].positions).toStrictEqual([
        [1, 0],
        [1, 1],
        [1, 2],
        [1, 3],
      ]);
    });

    test('there is a number at the end of the line', () => {
      const input = '..45';
      const result = getPartNumbersAndSymbols(input, 1);
      expect(result.partNumbers[0].number).toBe(45);
      expect(result.partNumbers[0].positions).toStrictEqual([
        [1, 2],
        [1, 3],
      ]);
    });

    test('there is a number somewhere in the line', () => {
      const input = '..45..';
      const result = getPartNumbersAndSymbols(input, 1);
      expect(result.partNumbers[0].number).toBe(45);
      expect(result.partNumbers[0].positions).toStrictEqual([
        [1, 2],
        [1, 3],
      ]);
    });

    test('there are two nubers somewhere in the line', () => {
      const input = '..45..324';
      const result = getPartNumbersAndSymbols(input, 1);
      expect(result.partNumbers[0].number).toBe(45);
      expect(result.partNumbers[0].positions).toStrictEqual([
        [1, 2],
        [1, 3],
      ]);
      expect(result.partNumbers[1].number).toBe(324);
      expect(result.partNumbers[1].positions).toStrictEqual([
        [1, 6],
        [1, 7],
        [1, 8],
      ]);
    });

    test('there is only one symbol in the line', () => {
      const input = '*';
      const result = getPartNumbersAndSymbols(input, 1);
      expect(result.symbols).toStrictEqual([[1, 0]]);
    });

    test('there are more symbols in the line', () => {
      const input = '...$.*....';
      const result = getPartNumbersAndSymbols(input, 1);
      expect(result.symbols).toStrictEqual([
        [1, 3],
        [1, 5],
      ]);
    });

    test('there are symbols and numbers in the line', () => {
      const input = '...$.*.67..5';
      const result = getPartNumbersAndSymbols(input, 1);
      expect(result.symbols).toStrictEqual([
        [1, 3],
        [1, 5],
      ]);

      expect(result.partNumbers[0].number).toBe(67);
      expect(result.partNumbers[0].positions).toStrictEqual([
        [1, 7],
        [1, 8],
      ]);

      expect(result.partNumbers[1].number).toBe(5);
      expect(result.partNumbers[1].positions).toStrictEqual([[1, 11]]);
    });
  });
});
