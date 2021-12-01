import run from "aocrunner"
import _ from 'lodash'

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split('\n')
    .map(s => parseInt(s))

  return countIncreases(input);
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n').map(s => parseInt(s))
  const windowSums = _
    .zip(_.dropRight(input,2), _.drop(_.dropRight(input,1),1), _.drop(input,2))
    .map(w => _.sum(w));
  
  return countIncreases(windowSums)
}

const countIncreases = (array: number[]) =>
  _.reduce(
    _.zip(array, [Infinity, ...array]),
    (acc, curr) => curr[0]!! > curr[1]!! ? acc+1 : acc, 
    0
  );

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
