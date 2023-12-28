export const getRecordBeatingChargingTimes = (raceDuration: number, record: number): number[] => {
  const result: number[] = [];
  const halfTime = Math.ceil(raceDuration / 2);
  let i = 0;

  for (let time = halfTime; time <= raceDuration; time++) {
    const distanceWithCurrentTime = (raceDuration - time) * time;
    if (distanceWithCurrentTime > record) {
      result.push(time);
    }

    const pairTime = raceDuration % 2 === 0 ? raceDuration - time : Math.abs(i * 2 - time);

    const distanceWithPairTime = (raceDuration - pairTime) * pairTime;

    if (pairTime < halfTime && distanceWithPairTime > record) {
      result.push(pairTime);
    }
    i++;
  }

  return result;
};

export const parseInput = (input: string): { times: number[]; records: number[] } => {
  const [time, distance] = input.split('\n');
  const [_, timeValues] = time.split(/:\s/g);
  const [__, distanceValues] = distance.split(/:\s/g);

  return {
    times: timeValues.split(/\s/).reduce((acc: number[], curr: string): number[] => {
      const value = parseInt(curr);
      if (!isNaN(value)) {
        return [...acc, value];
      }
      return acc;
    }, []),
    records: distanceValues.split(/\s/).reduce((acc: number[], curr: string): number[] => {
      const value = parseInt(curr);
      if (!isNaN(value)) {
        return [...acc, value];
      }
      return acc;
    }, []),
  };
};
