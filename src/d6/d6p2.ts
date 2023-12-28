import fs from 'fs';
import { getRecordBeatingChargingTimes } from './d6p1.lib';
import { parseInput } from './d6p2.lib';

(async () => {
  const conent = fs.readFileSync('src/d6/d6.input.txt');
  const parsedInput = parseInput(conent.toString());

  console.log(getRecordBeatingChargingTimes(parsedInput.time, parsedInput.record).length);
})();
