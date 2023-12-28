import { describe, expect, test } from '@jest/globals';
import { getGearRatio, getPartNumbersAndStars } from './d3p2.lib';

describe('d3p2', () => {
  describe('get part numbers and gears', () => {
    test('there is only a single number in the line', () => {
      const input = '456';
      const result = getPartNumbersAndStars(input, 0);
      expect(result.partNumbers[0].number).toBe(456);
      expect(result.partNumbers[0].positions).toStrictEqual([
        [0, 0],
        [0, 1],
        [0, 2],
      ]);
    });

    test('there is only a single number in the line', () => {
      const input = '4567';
      const result = getPartNumbersAndStars(input, 1);
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
      const result = getPartNumbersAndStars(input, 1);
      expect(result.partNumbers[0].number).toBe(45);
      expect(result.partNumbers[0].positions).toStrictEqual([
        [1, 2],
        [1, 3],
      ]);
    });

    test('there is a number somewhere in the line', () => {
      const input = '..45..';
      const result = getPartNumbersAndStars(input, 1);
      expect(result.partNumbers[0].number).toBe(45);
      expect(result.partNumbers[0].positions).toStrictEqual([
        [1, 2],
        [1, 3],
      ]);
    });

    test('there are two nubers somewhere in the line', () => {
      const input = '..45..324';
      const result = getPartNumbersAndStars(input, 1);
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

    test('there is only one star in the line', () => {
      const input = '*';
      const result = getPartNumbersAndStars(input, 1);
      expect(result.stars).toStrictEqual([[1, 0]]);
    });

    test('there are more stars somwehere in the line', () => {
      const input = '..*..*..';
      const result = getPartNumbersAndStars(input, 1);
      expect(result.stars).toStrictEqual([
        [1, 2],
        [1, 5],
      ]);
    });

    test('there are more stars with other symbols in the line', () => {
      const input = '*..$.*..%.';
      const result = getPartNumbersAndStars(input, 1);
      expect(result.stars).toStrictEqual([
        [1, 0],
        [1, 5],
      ]);
    });

    test('there are stars and numbers in the line', () => {
      const input = '...$.*.67..5';
      const result = getPartNumbersAndStars(input, 1);
      expect(result.stars).toStrictEqual([[1, 5]]);

      expect(result.partNumbers[0].number).toBe(67);
      expect(result.partNumbers[0].positions).toStrictEqual([
        [1, 7],
        [1, 8],
      ]);

      expect(result.partNumbers[1].number).toBe(5);
      expect(result.partNumbers[1].positions).toStrictEqual([[1, 11]]);
    });
  });

  describe('getGearRatio', () => {
    test('there is 0 gear ratio', () => {
      expect(getGearRatio([0, 2], [{ number: 8, positions: [[0, 3]] }])).toBe(0);
      expect(
        getGearRatio(
          [0, 2],
          [
            { number: 8, positions: [[0, 3]] },
            { number: 9, positions: [[0, 1]] },
            { number: 4, positions: [[1, 1]] },
          ]
        )
      ).toBe(0);
    });

    test('gear ratio greater than 0', () => {
      expect(getGearRatio([0, 2], [{ number: 8, positions: [[0, 4]] }])).toBe(0);
      expect(
        getGearRatio(
          [0, 2],
          [
            { number: 8, positions: [[0, 3]] },
            { number: 9, positions: [[0, 1]] },
          ]
        )
      ).toBe(72);
    });
  });
});
