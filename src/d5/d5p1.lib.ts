export type CategoryRangeMap = Array<[number, number, number]>;
export type Almanac = { initNumbers: number[]; categoryMaps: [{ categoryMapName: string; map: CategoryRangeMap }] };

export const getNextNumber = (currentNumber: number, ranges: Array<number>): number => {
  const rangeLength = ranges[2];
  const sourceRangeStart = ranges[1];
  const sourceRangeEnd = getLastNumOfRange(sourceRangeStart, rangeLength);
  const destinationRangeStart = ranges[0];

  if (currentNumber >= sourceRangeStart && currentNumber <= sourceRangeEnd) {
    return destinationRangeStart - sourceRangeStart + currentNumber;
  }
  return currentNumber;
};

export const getNextNumberFromCategoryMap = (currentNumber: number, categoryMap: CategoryRangeMap): number => {
  for (const range of categoryMap) {
    const nextNumber = getNextNumber(currentNumber, range);
    if (nextNumber !== currentNumber) {
      return nextNumber;
    }
  }
  return currentNumber;
};
export const parseInput = (input: string): Almanac => {
  const parsed = input.split('\n\n');
  const [_, init] = parsed[0].split(': ');
  const initNumbers = init.split(' ').map((n: any) => parseInt(n));

  const result: Almanac = { initNumbers, categoryMaps: [] as any };

  parsed.forEach((_, index) => {
    if (index > 0) {
      const [categoryMapName, ranges] = parsed[index].split(':\n');
      result.categoryMaps.push({
        categoryMapName: categoryMapName.split(' ')[0],
        map: ranges.split('\n').map((r: any) => r.split(' ').map((n: any) => parseInt(n))),
      });
    }
  });

  return result;
};

export const getLastNumOfRange = (firstNum: number, rangeLength: number): number => {
  return firstNum + (rangeLength - 1);
};
