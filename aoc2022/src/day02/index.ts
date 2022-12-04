import run from "aocrunner"
import _ from "lodash"

const value = (yours: string): number => {
switch(yours) {
    case "X": return 1;
    case "Y": return 2;
    case "Z": return 3;
    default: return 0;
  }
}

const points = (theirs: string, yours: string): number => {
  switch(theirs) {
    case "A":
      switch(yours) {
        case "X": return 3;
        case "Y": return 6;
        case "Z": return 0;
      }
    case "B":
      switch(yours) {
        case "X": return 0;
        case "Y": return 3;
        case "Z": return 6;
      }
    case "C":
      switch(yours) {
        case "X": return 6;
        case "Y": return 0;
        case "Z": return 3;
      }
    default: return -1;
  }
}

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let result = _.chain(input)
    .split('\n')
    .map((line) => line.split(" "))
    .map(([a,b]) => points(a,b) + value(b))
    .sum()
    .value()

  return result
}

const transform = (a: string, b: string): string => {
  switch (a) {
    case "A":
      switch (b) {
        case "X": return "Z";
        case "Y": return "X";
        case "Z": return "Y";
      }
    case "B":
      switch (b) {
        case "X": return "X";
        case "Y": return "Y";
        case "Z": return "Z";
      }
    case "C":
      switch (b) {
        case "X": return "Y";
        case "Y": return "Z";
        case "Z": return "X";
      }
    default: return "Z";
  }
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let result = _.chain(input)
    .split('\n')
    .map((line) => line.split(" "))
    .map(([a,b]) => {
      b = transform(a,b)
      return points(a,b) + value(b)
    })
    .sum()
    .value()

  return result
  return
}

run({
  part1: {
    tests: [
      {
        input: `
A Y
B X
C Z`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
A Y
B X
C Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
