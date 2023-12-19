import { describe, expect, test } from '@jest/globals';
import { getTwoDigitNumber } from './d1p1.lib';

describe('d1p1', () => {
  test('should return the number as two-digit number if there is only one digit', () => {
    expect(getTwoDigitNumber('1')).toBe(11);
  });

  test('should return the number if there are only two digits', () => {
    expect(getTwoDigitNumber('11')).toBe(11);
  });

  test('should return the first and last digit if there are more than two digits', () => {
    expect(getTwoDigitNumber('123')).toBe(13);
  });

  test('should return the first and last digit if there are digits and letters between them', () => {
    expect(getTwoDigitNumber('1erefd45sfds3')).toBe(13);
  });

  test('should return the first and last digit if there are letters before and after the digits', () => {
    expect(getTwoDigitNumber('werw1erefd45sfds3ertrg')).toBe(13);
  });

  test('should return the first and last digit even if the digits are spelled out', () => {
    expect(getTwoDigitNumber('asdone4as56sevenfoo')).toBe(17);
    expect(getTwoDigitNumber('two1nine')).toBe(29);
    expect(getTwoDigitNumber('eightwothree')).toBe(83);
    expect(getTwoDigitNumber('abcone2threexyz')).toBe(13);
    expect(getTwoDigitNumber('xtwone3four')).toBe(24);
    expect(getTwoDigitNumber('4nineeightseven2')).toBe(42);
    expect(getTwoDigitNumber('zoneight234')).toBe(14);
    expect(getTwoDigitNumber('7pqrstsixteen')).toBe(76);
    expect(getTwoDigitNumber('oneight')).toBe(18);
  });
});
