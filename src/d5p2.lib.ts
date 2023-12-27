import { CategoryRangeMap, getLastNumOfRange, getNextNumber } from './d5p1.lib';

export type Range = [number, number];

export const getNexRangesFromCategoryMap = (currentRanges: Range[], categoryMap: CategoryRangeMap): Range[] => {
  const result: Range[] = [];
  let remainingRanges = [...currentRanges];

  categoryMap.forEach((categoryRange) => {
    const sourceRangeFirst = categoryRange[1];
    const sourceRangeLast = getLastNumOfRange(sourceRangeFirst, categoryRange[2]);
    const newRemainingRanges: Range[] = [];
    remainingRanges.forEach((range) => {
      const currentRangeFirst = range[0];
      const currentRangeLast = range[1];

      if (currentRangeFirst >= sourceRangeFirst && currentRangeLast <= sourceRangeLast) {
        result.push([getNextNumber(currentRangeFirst, categoryRange), getNextNumber(currentRangeLast, categoryRange)]);
      } else if (
        currentRangeFirst < sourceRangeFirst &&
        currentRangeLast <= sourceRangeLast &&
        currentRangeLast >= sourceRangeFirst
      ) {
        result.push([getNextNumber(sourceRangeFirst, categoryRange), getNextNumber(currentRangeLast, categoryRange)]);
        newRemainingRanges.push([currentRangeFirst, sourceRangeFirst - 1]);
      } else if (
        currentRangeFirst >= sourceRangeFirst &&
        currentRangeFirst <= sourceRangeLast &&
        currentRangeLast > sourceRangeLast
      ) {
        result.push([getNextNumber(currentRangeFirst, categoryRange), getNextNumber(sourceRangeLast, categoryRange)]);
        newRemainingRanges.push([sourceRangeLast + 1, currentRangeLast]);
      } else if (currentRangeFirst < sourceRangeFirst && currentRangeLast > sourceRangeLast) {
        result.push([getNextNumber(sourceRangeFirst, categoryRange), getNextNumber(sourceRangeLast, categoryRange)]);
        newRemainingRanges.push([currentRangeFirst, sourceRangeFirst - 1], [sourceRangeLast + 1, currentRangeLast]);
      } else {
        newRemainingRanges.push([currentRangeFirst, currentRangeLast]);
      }
    });
    remainingRanges = [...newRemainingRanges];
  });

  return [...result, ...remainingRanges];
};
