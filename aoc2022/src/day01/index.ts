import run from "aocrunner"
import _ from "lodash";

const parseInput = (rawInput: string) => rawInput

const groupByNewLines = (tmp: number[][], line: string) => {
  if (line) tmp[tmp.length-1].push(parseInt(line))
  else tmp.push([]);
  return tmp;
}

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput)
    return _.chain(input)
      .split("\n")
      .reduce(groupByNewLines, [[]])
      .map((items) => _.sum(items))
      .max()
      .value();
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return _.chain(input)
    .split("\n")
    .reduce(groupByNewLines, [[]])
    .map((items) => _.sum(items))
    .sort((a,b) => b-a)
    .take(3)
    .sum()
    .value()
}

run({
  part1: {
    tests: [
      {
        input: `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
