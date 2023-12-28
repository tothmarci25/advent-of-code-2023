import { describe, expect, test } from '@jest/globals';
import { getMatches, getParsedNumbers, getWinPoints } from './d4p1.lib';

describe('d4p1', () => {
  test('get parsed numbers', () => {
    expect(getParsedNumbers('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53')).toStrictEqual({
      winningNumbers: [41, 48, 83, 86, 17],
      gameNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
    });
    expect(
      getParsedNumbers(
        'Card 217: 39 78 45  4 20 96 26 87 55  1 |  7 91 37 48 83 59 53 27 16 78 49 90 61 81 92 15 17 46 62 73 42  8  9 50 82'
      )
    ).toStrictEqual({
      winningNumbers: [39, 78, 45, 4, 20, 96, 26, 87, 55, 1],
      gameNumbers: [7, 91, 37, 48, 83, 59, 53, 27, 16, 78, 49, 90, 61, 81, 92, 15, 17, 46, 62, 73, 42, 8, 9, 50, 82],
    });
  });

  test('get matches', () => {
    expect(getMatches([1, 2, 3, 4], [6, 7, 8, 2, 23])).toBe(1);
    expect(getMatches([1, 2, 3, 4], [6, 7, 8, 2, 3])).toBe(2);
  });

  test('get win points', () => {
    expect(getWinPoints(4)).toBe(8);
    expect(getWinPoints(5)).toBe(16);
    expect(getWinPoints(6)).toBe(32);
  });
});
