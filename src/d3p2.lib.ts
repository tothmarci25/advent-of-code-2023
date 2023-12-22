import { PartNumber, Position, distance, hasAdjacentSymbol } from './d3p1.lib';

export const getPartNumbersAndStars = (
  line: string,
  lineIndex: number
): { partNumbers: PartNumber[]; stars: Position[] } => {
  const partNumbers: PartNumber[] = [];
  let isInsidePartNumber = false;
  const stars: Position[] = [];
  for (let index = 0; index < line.length; index++) {
    const char = line[index];
    const number = parseInt(char);
    if (!isNaN(number)) {
      if (!isInsidePartNumber) {
        partNumbers.push({
          number,
          positions: [[lineIndex, index]],
        });
        isInsidePartNumber = true;
      } else {
        const lastPartNumber = partNumbers.at(-1)!;
        lastPartNumber.number = lastPartNumber.number * 10 + number;
        lastPartNumber.positions.push([lineIndex, index]);
      }
    } else if (char === '*') {
      isInsidePartNumber = false;
      stars.push([lineIndex, index]);
    } else {
      isInsidePartNumber = false;
    }
  }

  return {
    partNumbers,
    stars,
  };
};

export const hasAdjacentPartNumber = (star: Position, partNumber: PartNumber): boolean => {
  return partNumber.positions.some((position) => distance(star, position) < 2);
};

export const getGearRatio = (star: Position, partNumbers: PartNumber[]): number => {
  const adjacentNumbers: number[] = [];
  partNumbers.forEach((partNumber) => {
    if (hasAdjacentPartNumber(star, partNumber)) {
      adjacentNumbers.push(partNumber.number);
    }
    if (adjacentNumbers.length > 2) {
      return 0;
    }
  });
  return adjacentNumbers.length === 2 ? adjacentNumbers[0] * adjacentNumbers[1] : 0;
};

export const sumGearRatio = (partNumbers: PartNumber[], stars: Position[]): number => {
  return stars.reduce((acc, star) => {
    return (acc += getGearRatio(star, partNumbers));
  }, 0);
};
