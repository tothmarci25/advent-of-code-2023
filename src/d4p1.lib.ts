export type ParsedNumbers = { winningNumbers: number[]; gameNumbers: number[] };

export const getParsedNumbers = (line: string): ParsedNumbers => {
  const [_card, numbers] = line.split(': ');
  const [winningNumbersInLine, gameNumbersInLine] = numbers.split(' | ');
  const winningNumbers = winningNumbersInLine.split(' ').reduce((acc, num) => {
    const number = parseInt(num);
    if (!isNaN(number)) {
      return [...acc, number];
    }
    return [...acc];
  }, [] as number[]);
  const gameNumbers = gameNumbersInLine.split(' ').reduce((acc, num) => {
    const number = parseInt(num);
    if (!isNaN(number)) {
      return [...acc, number];
    }
    return [...acc];
  }, [] as number[]);

  return { winningNumbers, gameNumbers };
};

export const getMatches = (winningNumbers: number[], gameNumbers: number[]): number => {
  return gameNumbers.filter((num) => winningNumbers.includes(num)).length;
};

export const getWinPoints = (matches: number): number => {
  let result = 0;
  for (let i = 1; i <= matches; i++) {
    if (i === 1) {
      result = 1;
    } else {
      result *= 2;
    }
  }
  return result;
};
