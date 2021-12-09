import run from "aocrunner"
import _ from 'lodash';

const parseInput = (rawInput: string) => 
  rawInput
    .split('\n')
    .map(line => {
      const [first, second] = line.split(' | ');
      return [first.split(' '), second.split(' ')];
    });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return _.sumBy(input, ([, fourDigits]) => {
    const only_1_4_7_8 = (s: string) => [2,3,4,7].includes(s.length);
    return fourDigits.filter(only_1_4_7_8).length;
  });
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return _.sumBy(input, getFourDigitsFromConfiguration);
} 

const getFourDigitsFromConfiguration = (line: string[][]): number => {
  const [rawConfig, rawDigits] = line;
  const _1 = rawConfig.find(s => s.length === 2)?.split('')!!;
  const _4 = rawConfig.find(s => s.length === 4)?.split('')!!;

  const stringNumber = rawDigits.map(rawDigit => {
    switch (rawDigit.length) {
      case 2: return '1';
      case 3: return '7';
      case 4: return '4';
      case 7: return '8';
      case 6:
        if (_4.every(s => rawDigit.includes(s))) return '9';
        if (_1.every(s => rawDigit.includes(s))) return '0';
        return '6';
      case 5:
        if (_1.every(s => rawDigit.includes(s))) return '3';
        const included = _4.filter(s => rawDigit.includes(s)).length;
        if (included === 3) return '5';
        return '2'
    };
  }).join('');

  return parseInt(stringNumber);
}

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
