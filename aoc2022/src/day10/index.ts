import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n')
  const cycles = [20, 60, 100, 140, 180, 220]

  const result = _.chain(input)
    .flatMap(line => line.startsWith("addx") ? ["noop", line] : [line])
    .reduce((registers, line, i) => {
      const oldRegister = registers[i];
      const newRegister = line.startsWith("addx")
        ? parseInt(line.split(' ')[1]) + oldRegister
        : oldRegister

      registers.push(newRegister)
      return registers;
    }, [1])
    .flatMap((r, i) => cycles.includes(i+1) ? [r * (i+1)] : [])
    .sum()
    .value()

  return result;
}

const isSpriteShown = (pixelPosition: number, spritePosition: number): boolean => {
  return Math.abs(pixelPosition - spritePosition) <= 1;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n')
  const width = 40;
  const height = 6;
  const newLines = _.times(height, i => width * (i+1))

  const result = _.chain(input)
    .flatMap(line => line.startsWith("addx") ? ["noop", line] : [line])
    .reduce(({spritePosition, screen}, line, i) => {

      if (line.startsWith("addx")) {
        spritePosition += parseInt(line.split(' ')[1]);
      }
      const pixelPosition = 1 + i % width;
      screen += isSpriteShown(pixelPosition, spritePosition)
        ? "#"
        : '.'
      if (newLines.includes(i)) screen += '\n#';

      return {spritePosition, screen}
    }, {spritePosition: 1, screen: ""})
    .value()
    .screen + '.'

    console.log(result);
  return result;
}

run({
  part1: {
    tests: [
      {
        input: `
addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`,
        expected: 13140,
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
