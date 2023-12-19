export const getTwoDigitNumber = (input: string): number => {
  const convertedLeftInput = convertSpelledOutDigitsLeft(input);
  const convertedRightInput = convertSpelledOutDigitsRight(input);
  return (
    getFirstDigit(convertedLeftInput) * 10 + getLastDigit(convertedRightInput)
  );
};

const getFirstDigit = (input: string): number => {
  let numFromLeft = parseInt(input.at(0)!);
  let indexFromLeft = 0;
  while (isNaN(numFromLeft)) {
    numFromLeft = parseInt(input.at(++indexFromLeft)!);
  }
  return numFromLeft;
};

const getLastDigit = (input: string): number => {
  let numFromRight = parseInt(input.at(-1)!);
  let indexFromRight = -1;
  while (isNaN(numFromRight)) {
    numFromRight = parseInt(input.at(--indexFromRight)!);
  }
  return numFromRight;
};

export const convertSpelledOutDigitsLeft = (input: string): string => {
  let convertedInput = input;
  const mapping = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  };

  let currentPrefix = '';
  for (let index = 0; index < input.length; index++) {
    currentPrefix = currentPrefix + input[index];
    let found = false;
    for (const [from, to] of Object.entries(mapping)) {
      if (from.startsWith(currentPrefix)) {
        found = true;
        if (from.length === currentPrefix.length) {
          convertedInput = convertedInput.replace(from, to);
          currentPrefix = '';
          break;
        }
      }
    }
    if (!found) {
      currentPrefix = dropFirst(currentPrefix);
    }
  }
  return convertedInput;
};

export const convertSpelledOutDigitsRight = (input: string): string => {
  let convertedInput = reverse(input);
  const mapping = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  };

  let currentPrefix = '';
  for (let index = 0; index < input.length; index++) {
    currentPrefix = currentPrefix + reverse(input)[index];
    let found = false;
    for (const [from, to] of Object.entries(mapping)) {
      if (reverse(from).startsWith(currentPrefix)) {
        found = true;
        if (from.length === currentPrefix.length) {
          convertedInput = convertedInput.replace(reverse(from), to);
          currentPrefix = '';
          break;
        }
      }
    }
    if (!found) {
      currentPrefix = dropFirst(currentPrefix);
    }
  }
  return reverse(convertedInput);
};

function reverse(s: string): string {
  return s.split('').reverse().join('');
}

function dropFirst(input: string): string {
  const arr = input.split('');
  arr.shift();
  return arr.join('');
}
