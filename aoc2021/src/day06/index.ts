import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput: string) => rawInput.split(',').map(s => parseInt(s));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  // old inefficient solution
  // const finalInput = _.range(0, 80).reduce((currInput, day) => {
  //   return currInput.flatMap(n => n > 0  ? [n-1] : [6,8]);
  // }, input);
  // return finalInput.length;

  return _.sum(input.map(n => generates(n, 80)));
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return _.sumBy(input, n => generates(n, 256));
}

const generatesSingle = (n: number, days: number): number => {
  if (n >= days) return 0;
  return Math.trunc((days - n - 1) / 7) + 1;
}

const memo: {[key: string]: number} = {};
const generates = (n: number, daysLeft: number): number => {
  if (n >= daysLeft) return daysLeft >= 0 ? 1 : 0;

  const key = n + ":" + daysLeft;
  if (memo.hasOwnProperty(key)) {
    return memo[key];
  }
  const generated = _.range(0, generatesSingle(n, daysLeft))
    .map(i => {
      const newDaysLeft = daysLeft - n - 1 - 7 * i;
      return generates(8, newDaysLeft);
    });

  const generatedPlusSelf = 1 + _.sum(generated);
  memo[n + ":" + daysLeft] = generatedPlusSelf;
  return generatedPlusSelf;
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
