import run from "aocrunner"
import _, { range } from "lodash"

const parseInput = (rawInput: string) => rawInput

const rangeContains = (ranges: number[][]): boolean => {
  const [range1, range2] = ranges;
  return (range1[0] <= range2[0] && range1[1] >= range2[1]) || (range1[0] >= range2[0] && range1[1] <= range2[1])
}

const rangeOverlaps = (ranges: number[][]): boolean => {
  const [range1, range2] = ranges;
  return ! (range1[1] < range2[0] || range2[1] < range1[0])
}

const intoRanges = (line: string): number[][] => {
  return line
    .split(',')
    .map(range => range.split('-').map(ch => parseInt(ch)))
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return _.chain(input)
    .split('\n')
    .map(intoRanges)
    .filter(rangeContains)
    .size()
    .value()
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return _.chain(input)
    .split('\n')
    .map(intoRanges)
    .filter(rangeOverlaps)
    .size()
    .value();
}

run({
  part1: {
    tests: [
      {
        input: `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
