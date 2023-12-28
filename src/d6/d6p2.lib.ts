export const parseInput = (input: string): { time: number; record: number } => {
  const [time, distance] = input.split('\n');
  const [_, timeValues] = time.split(/:\s/g);
  const [__, distanceValues] = distance.split(/:\s/g);

  return {
    time: timeValues.split(/\s/).reduce((acc: number, curr: string): number => {
      const value = parseInt(curr);
      if (!isNaN(value)) {
        return acc * Math.pow(10, curr.length) + value;
      }
      return acc;
    }, 0),
    record: distanceValues.split(/\s/).reduce((acc: number, curr: string): number => {
      const value = parseInt(curr);
      if (!isNaN(value)) {
        return acc * Math.pow(10, curr.length) + value;
      }
      return acc;
    }, 0),
  };
};
