import readline from 'readline';
import fs from 'fs';
import { getMatches, getParsedNumbers, getWinPoints } from './d4p1.lib';

(async () => {
  const lines = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/d4/d4.input.txt`),
  });

  let result = 0;
  let lineIndex = 0;
  const copyCards: { [key: number]: number } = {};
  for await (const line of lines) {
    const { winningNumbers, gameNumbers } = getParsedNumbers(line);
    const matches = getMatches(winningNumbers, gameNumbers);
    const processRound = copyCards[lineIndex] || 1;
    for (let i = 0; i < processRound; i++) {
      if (matches) {
        Array.from({ length: matches }).forEach((_, index) => {
          const copyIndex = lineIndex + 1 + index;
          copyCards[copyIndex] = copyCards[copyIndex] ? copyCards[copyIndex] + 1 : 2;
        });
      }
      result++;
    }
    lineIndex++;
  }

  console.log(result);
})();
