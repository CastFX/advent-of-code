import run from "aocrunner"
import _ from 'lodash';

const parseInput = (rawInput: string) => rawInput.split(',').map(s => parseInt(s))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const fuelUsedCalculator = (input: number[], position: number): number =>
    _.sum(input.map(n => Math.abs(n - position))); 
  
  return getMinFuelUsed(input, fuelUsedCalculator);
}

const getMinFuelUsed = (
  input: number[],
  fuelUsedCalculator: (input: number[], position: number) => number
): number => {
  const max = _.max(input)!!;
  const min = _.min(input)!!;

  return _.range(min, max).reduce((minFuelUsed, attempt) => {
    const fuelUsed = fuelUsedCalculator(input, attempt);
    return Math.min(minFuelUsed, fuelUsed);
  }, Infinity)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  
  const fuelUsedCalculator = (input: number[], position: number): number => {
    return _.sum(input.map(n => {
      const diff = Math.abs(n - position);
      return (diff*diff + diff) / 2;
    }));
  }
  
  return getMinFuelUsed(input, fuelUsedCalculator);
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
