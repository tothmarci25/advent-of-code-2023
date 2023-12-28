import readline from 'readline';
import fs from 'fs';
import { getPartNumbersAndSymbols, sumPartNumbers } from './d3p1.lib';

(async () => {
  const lines = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/d3.input.txt`),
  });

  let lineIndex = 0;
  const partNumbers = [];
  const symbols = [];
  for await (const line of lines) {
    const { partNumbers: partNumbersInLine, symbols: symbolsInLine } = getPartNumbersAndSymbols(line, lineIndex);
    partNumbers.push(...partNumbersInLine);
    symbols.push(...symbolsInLine);
    lineIndex += 1;
  }

  console.log(sumPartNumbers(partNumbers, symbols));
})();
