import { describe, expect, test } from '@jest/globals';
import { getLastNumOfRange, getNextNumber, getNextNumberFromCategoryMap } from './d5p1.lib';

describe('d5p1', () => {
  test('get next number from range array', () => {
    expect(getNextNumber(1, [0, 0, 0])).toBe(1);
    expect(getNextNumber(1, [3, 2, 12])).toBe(1);
    expect(getNextNumber(1, [3, 0, 12])).toBe(4);
    expect(getNextNumber(79, [52, 50, 48])).toBe(81);
  });

  test('get next number from category map', () => {
    expect(
      getNextNumberFromCategoryMap(1, [
        [0, 0, 0],
        [3, 2, 12],
      ])
    ).toBe(1);
    expect(
      getNextNumberFromCategoryMap(1, [
        [0, 0, 0],
        [3, 0, 12],
        [3, 2, 12],
      ])
    ).toBe(4);
    expect(
      getNextNumberFromCategoryMap(79, [
        [50, 9, 2],
        [52, 50, 48],
      ])
    ).toBe(81);
  });

  test('get last number of range', () => {
    expect(getLastNumOfRange(12, 5)).toBe(16);
    expect(getLastNumOfRange(2, 10)).toBe(11);
  });
});
