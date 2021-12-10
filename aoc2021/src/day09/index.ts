import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput: string) => rawInput.split('\n').map(s => s.split(''))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const mins = getMins(input);
  return _.sumBy(mins, 'value') + mins.length;
}

const getMins = (input: string[][]): Min[] => {
  const mins: Min[] = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      const element = parseInt(input[i][j]);
      const upper = parseInt(input[i][j-1]);
      const lower = parseInt(input[i][j+1]);
      const left = parseInt(input[i-1]?.[j]);
      const right = parseInt(input[i+1]?.[j]);

      const checks = [upper, lower, left, right].filter(n => !Number.isNaN(n));

      if (checks.every(i => element < i)) {
        mins.push({x: j, y: i, value: element});
      }
    }
  }
  return mins;
}

interface Min {
  x: number;
  y: number;
  value: number;
}


const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const mins = getMins(input);
  
  const basins = mins
    .map(min => {
      const explored: {[key: string]: boolean} = {[min.x+':'+min.y]: true};
      return 1 +
        exploreBasin(min, min.x+1, min.y, input, explored) +
        exploreBasin(min, min.x-1, min.y, input, explored) +
        exploreBasin(min, min.x, min.y+1, input, explored) +
        exploreBasin(min, min.x, min.y-1, input, explored)
    });
  
  console.log(_.sortBy(basins).reverse())


  return _.takeRight(_.sortBy(basins), 3).reduce((a,b) => a * b, 1);
}

const exploreBasin = (
  min: Min,
  x: number,
  y: number,
  input: string[][],
  explored: {[key: string]: boolean} = {}
): number => {
  const key = x+':'+y;
  if (explored[key]) return 0;
  
  const value = parseInt(input[y]?.[x]); 
  if (Number.isNaN(value) ) return 0;

  if (value <= min.value || value === 9) {
    return 0;
  }
  explored[key] = true;

  const newMin = {x, y, value};
  return 1 +
    exploreBasin(newMin, x+1, y, input, explored) +
    exploreBasin(newMin, x-1, y, input, explored) +
    exploreBasin(newMin, x, y+1, input, explored) +
    exploreBasin(newMin, x, y-1, input, explored)
}



run({
  part1: {
    tests: [
      { input: 
`
2199943210
3987894921
9856789892
8767896789
9899965678`, expected: 15 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: 
`
2199943210
3987894921
9856789892
8767896789
9899965678`, expected: 1134 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
