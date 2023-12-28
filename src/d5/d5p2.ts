import readline from 'readline';
import fs from 'fs';
import { getLastNumOfRange, getNextNumberFromCategoryMap, parseInput } from './d5p1.lib';
import { Range, getNexRangesFromCategoryMap } from './d5p2.lib';

(async () => {
  const conent = fs.readFileSync('src/d5/d5.input.txt');
  const parsedInput = parseInput(conent.toString());

  const initialRanges: Range[] = [];

  for (let i = 0; i < parsedInput.initNumbers.length; i += 2) {
    const firstInitNumberInRange = parsedInput.initNumbers[i];
    const rangeLenght = parsedInput.initNumbers[i + 1];
    const lastInitNumberInRange = getLastNumOfRange(firstInitNumberInRange, rangeLenght);

    initialRanges.push([firstInitNumberInRange, lastInitNumberInRange] as Range);
  }

  let nextRanges = [...initialRanges];

  parsedInput.categoryMaps.forEach((category) => {
    nextRanges = [...getNexRangesFromCategoryMap(nextRanges, category.map)];
  });

  let result = Number.MAX_SAFE_INTEGER;

  nextRanges.forEach((range) => {
    if (range[0] < result) {
      result = range[0];
    }
  });

  console.log(result);
})();
