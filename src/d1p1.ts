import readline from 'readline';
import fs from 'fs';
import { getTwoDigitNumber } from './d1p1.lib';

(async () => {
  const lines = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/d1.input.txt`)
  });

  let result = 0;
  for await (const line of lines) {
    result += getTwoDigitNumber(line);
  }

  console.log(result);
})();