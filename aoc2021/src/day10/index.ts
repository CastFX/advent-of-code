import run from "aocrunner"
import _ from 'lodash'

const parseInput = (rawInput: string) => rawInput.split('\n').map(s => s.split(''))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const corruptedScore = input.map(line => corruptingPoints(line))
  return _.sum(corruptedScore)
}

const reverseBracket = (bracket: string): string => {
  switch (bracket) {
    case '(': return ')'
    case '[': return ']'
    case '{': return '}'
    case '<': return '>'
    case ')': return '('
    case ']': return '['
    case '}': return '{'
    case '>': return '<'
    default: return "";
  }
}
const points: {[key: string]: number} = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};
const closing = Object.keys(points);
const opening = closing.map(reverseBracket);

const corruptingPoints = (
  line: string[],
  stack: string[] = [],
): number => {
  if (_.isEmpty(line)) return 0;

  const firstChar = line[0]
  const rest = _.drop(line, 1);
  if (opening.includes(firstChar)) {
    return corruptingPoints(rest, [firstChar, ...stack]);
  }
  if (reverseBracket(firstChar) === stack[0]) {
    return corruptingPoints(rest, _.drop(stack, 1));
  }
  return points[firstChar];
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const incomplete = input
    .filter(line => corruptingPoints(line) === 0)
    .map(line => completingPoints(line))

  const sorted = _.sortBy(incomplete);
  return sorted[(sorted.length - 1)/ 2];
}

const completingPoints = (line: string[], stack: string[] = []): number => {
  if (_.isEmpty(line)) return stack.reduce((points, bracket) => {
    return points * 5 + opening.indexOf(bracket) + 1
  }, 0);

  const firstChar = line[0]
  const rest = _.drop(line, 1);
  if (opening.includes(firstChar)) {
    return completingPoints(rest, [firstChar, ...stack]);
  }
  if (reverseBracket(firstChar) === stack[0]) {
    return completingPoints(rest, _.drop(stack, 1));
  }
  return -1;
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
