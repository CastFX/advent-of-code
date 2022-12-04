import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput: string) => rawInput

const splitStringInHalf = (string: string): string[] => {
  const halfLength = string.length / 2;
  return [string.slice(0, halfLength), string.slice(halfLength)];
}

const findCommonLetter = (rucksacks: string[]): string => {
  return _.intersection(...rucksacks.map(r => r.split('')))[0];
}

const isUpperCase = (letter: string): boolean => {
  return letter.toUpperCase() === letter;
}

const toPriority = (letter: string): number => {
  return isUpperCase(letter)
    ? letter.charCodeAt(0) - 64 + 26
    : letter.charCodeAt(0) - 96
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return _.chain(input)
    .split('\n')
    .map(splitStringInHalf)
    .map(findCommonLetter)
    .map(toPriority)
    .sum()
    .value();
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return _.chain(input)
    .split('\n')
    .chunk(3)
    .map(findCommonLetter)
    .map(toPriority)
    .sum()
    .value();
}

run({
  part1: {
    tests: [
      {
        input: `
vJrwpWtwJgWr hcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
vJrwpWtwJgWr hcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
