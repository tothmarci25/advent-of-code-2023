type Position = [number, number];

let result = 0;

const partNumbers: { number: number, positions: Position[] }[] = [
  { number: 411, positions: [ [0,4],[0,5],[0,6] ] }
]

const symbols: Position[] = []

const distance = (a: Position, b: Position): number => {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1],2));
}

partNumbers.forEach(partNumber => {
  partNumber.positions.forEach(position => {
    symbols.forEach(symbol => {
      if (distance(position, symbol) < 2) {
        result += partNumber.number;
      }
    })
  });
});
