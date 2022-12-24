import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput: string) => rawInput

function* windowGenerator(inputArray: string[], size: number) {
  for(let index = 0; index+size <= inputArray.length; index++) {
    yield inputArray.slice(index, index+size);
  }
}

const allUnique = (input: string[]) => input.length === (new Set(input)).size

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('')
  const window = 4;

  let i = 0;
  for (const chars of windowGenerator(input, window)) {
    if (allUnique(chars)) return window + i
    i++;
  }
  return 0;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('')
  const window = 14;

  let i = 0;
  for (const chars of windowGenerator(input, window)) {
    if (allUnique(chars)) return window + i
    i++;
  }
  return 0;
}

run({
  part1: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 7,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
