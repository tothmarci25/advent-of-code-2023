import readline from 'readline';
import fs from 'fs';
import { getMatches, getParsedNumbers, getWinPoints } from './d4p1.lib';

(async () => {
  const lines = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/d4.input.txt`),
  });

  let result = 0;
  for await (const line of lines) {
    const { winningNumbers, gameNumbers } = getParsedNumbers(line);
    result += getWinPoints(getMatches(winningNumbers, gameNumbers));
  }

  console.log(result);
})();
