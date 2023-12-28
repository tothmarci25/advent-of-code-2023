export type Position = [number, number];
export type PartNumber = { number: number; positions: Position[] };
export type ParsedLine = { partNumbers: PartNumber[]; symbols: Position[] };

const partNumbers: PartNumber[] = [
  {
    number: 411,
    positions: [
      [0, 4],
      [0, 5],
      [0, 6],
    ],
  },
];

const symbols: Position[] = [];

export const distance = (a: Position, b: Position): number => {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
};

export const sumPartNumbers = (partNumbers: PartNumber[], symbols: Position[]) => {
  let result = 0;
  partNumbers.forEach((partNumber) => {
    if (
      partNumber.positions.some((position) => {
        return hasAdjacentSymbol(position, symbols);
      })
    ) {
      result += partNumber.number;
    }
  });
  return result;
};

export const hasAdjacentSymbol = (position: Position, symbols: Position[]): boolean => {
  return symbols.some((symbol) => {
    return distance(position, symbol) < 2;
  });
};

export const getPartNumbersAndSymbols = (line: string, lineIndex: number): ParsedLine => {
  const partNumbers: PartNumber[] = [];
  let isInsidePartNumber = false;
  const symbols: Position[] = [];
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
    } else if (char === '.') {
      isInsidePartNumber = false;
    } else {
      isInsidePartNumber = false;
      symbols.push([lineIndex, index]);
    }
  }

  return {
    partNumbers,
    symbols,
  };
};
