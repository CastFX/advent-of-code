import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n');
  const {depth, x} = input.reduce(({depth, x}, currAction) => {
    const [actionType, valueString] = currAction.split(' ');
    const value = parseInt(valueString);

    switch (actionType) {
      case "forward": return {depth, x: (x + value)};
      case "down": return {depth: (depth + value), x};
      case "up": return {depth: (depth - value), x};
      default: return {depth, x};
    }
  }, {depth: 0, x: 0});
  return depth * x;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n');
  const {depth, x, aim} = input.reduce(({depth, x, aim}, currAction) => {
    const [actionType, valueString] = currAction.split(' ');
    const value = parseInt(valueString);

    switch (actionType) {
      case "forward": return {depth: depth + value * aim, x: x + value, aim};
      case "down": return {depth, x, aim: aim + value};
      case "up": return {depth, x, aim: aim - value};
      default: return {depth, x, aim};
    }
  }, {depth: 0, x: 0, aim: 0});
  return depth * x;
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
