import run from "aocrunner"
import _ from "lodash";

const parseInput = (rawInput: string) => rawInput

const crossLines = (x: number, y: number, input: number[][]): number[][] => {
  const row = input[y];
  const column = input.map(line => line[x]);
  return [
    row.slice(0, x).reverse(),
    row.slice(x+1),
    column.slice(0, y).reverse(),
    column.slice(y+1)
  ]
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split('\n')
    .map(line => line.split('').map(x => parseInt(x)))

  const height = input.length;
  const width = input[0]!.length;
  const onEdge = (x: number, y: number) =>
    x === 0 || y === 0 || x === width - 1 || y === height - 1

  const visibleInRow = (row: number[], y: number): number => {
    return row
      .filter((value, x) =>
        onEdge(x, y) ||
        crossLines(x, y, input)
          .some(line =>
            line.every(n => value > n)))
      .length
  }

  const visibleTrees = _.chain(input)
    .map(visibleInRow)
    .sum()
    .value()

  return visibleTrees;
}


const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split('\n')
    .map(line => line.split('').map(x => parseInt(x)))

  const height = input.length;
  const width = input[0]!.length;

  const score = (x: number, y: number, value: number): number => {
    const scoreForCrossLine = (line: number[]) =>
      Math.min(line.length, 1 + _.takeWhile(line, n => value > n).length)

    return crossLines(x, y, input)
      .map(scoreForCrossLine)
      .reduce((prod, val) => prod * val, 1)
  }

  const maxScoreInRow = (row: number[], y: number): number => {
    return _.chain(row)
      .map((value, x) => score(x,y,value))
      .max()
      .value()
  }

  const maxScore = _.chain(input)
    .map(maxScoreInRow)
    .max()
    .value();

  return maxScore;
}

run({
  part1: {
    tests: [
      {
        input: `30373
25512
65332
33549
35390`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `30373
25512
65332
33549
35390`,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
