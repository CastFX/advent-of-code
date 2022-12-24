import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput: string) => rawInput

const toLetters = (line: string) =>
  _.chunk(line.split(''), 4)
  .map((chars) => chars[0] === '[' ? chars[1] : null)

const toStacks = (tmp: string[][], symbols: (string|null)[]) => {
  symbols.forEach((symbol, i) => {
    if (symbol && tmp[i]) tmp[i].unshift(symbol!)
    else if (symbol) tmp[i] = [symbol!]
  })
  return tmp;
}

const re = /move (\d+) from (\d) to (\d)/i;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n')
  const stacks = _.chain(input)
    .takeWhile(line => line.includes('['))
    .map(toLetters)
    .reduce(toStacks, [] as string[][])
    .value()

  const result = _.chain(input)
    .dropWhile(line => !line.startsWith("move"))
    .map(move => move.match(re)!)
    .map(x => x.map(y => parseInt(y)))
    .map(([,qty, from, to]) => ({qty, from: from-1, to: to-1}))
    .reduce((tmp, {qty, from, to}) => {
      const origin: string[] = tmp[from as any];
      const destination: string[] = tmp[to as any];
      const index = origin.length - qty;
      const elementsToMove = origin
        .slice(index)
        .reverse();
      tmp[from as any] = origin.splice(0, index);
      destination.push(...elementsToMove);
      return tmp;
    }, stacks)
    .map(_.last)
    .join("")
    .value()

  return result
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n')
  const stacks = _.chain(input)
    .takeWhile(line => line.includes('['))
    .map(toLetters)
    .reduce(toStacks, [] as string[][])
    .value()

  const result = _.chain(input)
    .dropWhile(line => !line.startsWith("move"))
    .map(move => move.match(re)!)
    .map(x => x.map(y => parseInt(y)))
    .map(([,qty, from, to]) => ({qty, from: from-1, to: to-1}))
    .reduce((tmp, {qty, from, to}) => {
      const origin: string[] = tmp[from as any];
      const destination: string[] = tmp[to as any];
      const index = origin.length - qty;
      const elementsToMove = origin
        .slice(index)
        // reverse();
      tmp[from as any] = origin.splice(0, index);
      destination.push(...elementsToMove);
      return tmp;
    }, stacks)
    .map(_.last)
    .join("")
    .value()

  return result
}

run({
  part1: {
    tests: [
      {
        input: `    [D]
[N] [C]
[Z] [M] [P]
1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `    [D]
[N] [C]
[Z] [M] [P]
1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
})
