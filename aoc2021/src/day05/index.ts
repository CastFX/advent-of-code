import run from "aocrunner"
import _ from 'lodash';

const parseInput = (rawInput: string) => rawInput
  .split('\n')
  .map(line => 
    line.split(' -> ')
    .map(pos => pos.split(',')))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const type: {[key: string]: number} = {};

  const dangerousPoints = input.reduce((acc, line) => {
    const [start, end] = line;
    if (!isStraight(start, end)) return acc;
    pointInBetween(start, end).forEach(([x,y]) => {
      const key = x + ":" + y;
      const updatedOccurrences = (acc[key] ?? 0) + 1;
      acc[key] = updatedOccurrences;
    });
    return acc;
  }, type);

  return countDangerousPoints(dangerousPoints);
}

const countDangerousPoints = (dangerousMap: object): number => 
  _.sumBy(Object.values(dangerousMap), v => v >= 2 ? 1 : 0);

const isStraight = (start: string[], end: string[]): boolean => {
  return start[0] === end[0] || start[1] === end[1];
}

const isDiagonal = (start: string[], end: string[]): boolean => {
  const xDiff = parseInt(start[0]) - parseInt(end[0]);
  const yDiff = parseInt(start[1]) - parseInt(end[1]);
  return xDiff === yDiff || xDiff === -yDiff;
}

const pointInBetween = (start: string[], end: string[]): number[][] => {
  const xStart = parseInt(start[0]);
  const yStart = parseInt(start[1]);
  const xEnd = parseInt(end[0]);
  const yEnd = parseInt(end[1]);
  const xDiff = xStart - xEnd;
  const yDiff = yStart - yEnd;

  if (xStart === xEnd) { //vertical
    return rangeInclusive(yStart, yEnd).map(y => [xStart, y]);
  } else if (yStart === yEnd) { //horizontal
    return rangeInclusive(xStart, xEnd).map(x => [x, yStart]);
  } else if (xDiff === yDiff) { //diagonal 1
    return rangeInclusive(xDiff, 0).map(n => [xStart - xDiff + n, yStart - xDiff + n])
  } else if (xDiff === -yDiff) { //diagonal 2
    return rangeInclusive(xDiff, 0).map(n => [xStart - xDiff + n, yStart + xDiff - n])
  }
  return [];
}

const rangeInclusive = (start: number, end: number): number[] => {
  return _.range(start, end + (start > end ? -1 : 1));
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const type: {[key: string]: number} = {};

  const dangerousPoints = input.reduce((acc, line) => {
    const [start, end] = line;
    if (!isStraight(start, end) && !isDiagonal(start, end)) return acc;
    pointInBetween(start, end).forEach(([x,y]) => {
      const key = x + ":" + y;
      const updatedOccurrences = (acc[key] ?? 0) + 1;
      acc[key] = updatedOccurrences;
    });
    return acc;
  }, type);

  return countDangerousPoints(dangerousPoints);
}

run({
  part1: {
    tests: [
      {
input: `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`, 
      expected: 5 },
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
