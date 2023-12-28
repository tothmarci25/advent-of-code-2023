import fs from 'fs';
import { getNextNumberFromCategoryMap, parseInput } from './d5p1.lib';

(async () => {
  const conent = fs.readFileSync('src/d5.input.txt');
  const parsedInput = parseInput(conent.toString());

  const result: number[] = [];

  parsedInput.initNumbers.forEach((initNumber) => {
    let currentNumber = initNumber;

    parsedInput.categoryMaps.forEach((category) => {
      currentNumber = getNextNumberFromCategoryMap(currentNumber, category.map);
    });

    result.push(currentNumber);
  });

  console.log(Math.min(...result));
})();
