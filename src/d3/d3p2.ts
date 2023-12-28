import readline from 'readline';
import fs from 'fs';
import { getPartNumbersAndStars, sumGearRatio } from './d3p2.lib';

(async () => {
  const lines = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/d3/d3.input.txt`),
  });

  let lineIndex = 0;
  const partNumbers = [];
  const stars = [];
  for await (const line of lines) {
    const { partNumbers: partNumbersInLine, stars: starsInLine } = getPartNumbersAndStars(line, lineIndex);
    partNumbers.push(...partNumbersInLine);
    stars.push(...starsInLine);
    lineIndex += 1;
  }

  console.log(sumGearRatio(partNumbers, stars));
})();
