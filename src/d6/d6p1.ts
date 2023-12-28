import fs from 'fs';
import { getRecordBeatingChargingTimes, parseInput } from './d6p1.lib';

(async () => {
  const conent = fs.readFileSync('src/d6/d6.input.txt');
  const parsedInput = parseInput(conent.toString());

  let result = 1;

  parsedInput.times.forEach((time, index) => {
    const record = parsedInput.records[index];
    const winningNumbers = getRecordBeatingChargingTimes(time, record);

    result *= winningNumbers.length;
  });

  console.log(result);
})();
