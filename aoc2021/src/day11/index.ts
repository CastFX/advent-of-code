import run from "aocrunner"
import _ from 'lodash';

const parseInput = (rawInput: string) => rawInput.split('\n').map(line => line.split('').map(s => parseInt(s)))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return flashesForSteps(input, 100);
}

const flashesForSteps = (input: number[][], steps: number): number => {
  if (steps === 0) return 0;
  const incremented = input.map(line => line.map(n => n+1));
  const flashed = flash(incremented);
  const flashedCount = _.sum(flashed.map(line => line.filter(n => n === 0).length));

  return flashedCount + flashesForSteps(flashed, steps - 1);
  
}

const flash = (input: number[][]): number[][] => {
  while(_.max(input.map(line => _.max(line))!!)!! >= 10) {
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        if (input[i][j] >= 10) {
          const adjacent = [
            {x: i+1, y:j+1},
            {x: i+1, y:j-1},
            {x: i+1, y:j},
            {x: i-1, y:j+1},
            {x: i-1, y:j-1},
            {x: i-1, y:j},
            {x: i, y:j+1},
            {x: i, y:j-1},
          ];
          
          adjacent
            .filter(({x,y}) => input[x]?.[y] != null)
            .filter(({x,y}) => input[x][y] !== 0)
            .forEach(({x,y}) => input[x][y] += 1);
          
          input[i][j] = 0;
        }
      }
    }
  }

  return input;
}

const firstFullFlash = (input: number[][], step: number = 0): number => {
  if (input.every(line => line.every(n => n === 0))) return step;

  const incremented = input.map(line => line.map(n => n+1));
  const flashed = flash(incremented);

  return firstFullFlash(flashed, step + 1);
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return firstFullFlash(input);
}

run({
  part1: {
    tests: [
      { input: 
`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`, expected: 1656 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: 
`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`, expected: 195 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
