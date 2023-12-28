import { describe, expect, test } from '@jest/globals';
import { getRecordBeatingChargingTimes } from './d6p1.lib';

describe('d6p1', () => {
  test('get record beating numbers', () => {
    expect(getRecordBeatingChargingTimes(7, 9).every((num) => [2, 3, 4, 5].includes(num))).toBe(true);
  });
});
