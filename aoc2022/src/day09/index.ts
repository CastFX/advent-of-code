import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput: string) => rawInput

type Point = {
  x: number;
  y: number;
}

const areClose = (head: Point, tail: Point): boolean => {
  return Math.abs(head.x - tail.x) <= 1 && Math.abs(head.y - tail.y) <= 1
}

const move = (head: Point, direction: string): Point => {
  switch (direction) {
    case "L": return {...head, x: head.x -1}
    case "R": return {...head, x: head.x +1}
    case "U": return {...head, y: head.y +1}
    case "D": return {...head, y: head.y -1}
    default: return head;
  }
}

const follow = (head: Point, tail: Point): Point => {
  if (head.x === tail.x && head.y > tail.y) return {x: tail.x, y: tail.y + 1}
  if (head.x === tail.x && head.y < tail.y) return {x: tail.x, y: tail.y - 1}
  if (head.y === tail.y && head.x > tail.x) return {x: tail.x + 1, y: tail.y}
  if (head.y === tail.y && head.x < tail.x) return {x: tail.x - 1, y: tail.y}
  if (head.x > tail.x && head.y > tail.y) return {x: tail.x + 1, y: tail.y + 1}
  if (head.x > tail.x && head.y < tail.y) return {x: tail.x + 1, y: tail.y - 1}
  if (head.x < tail.x && head.y > tail.y) return {x: tail.x - 1, y: tail.y + 1}
  if (head.x < tail.x && head.y < tail.y) return {x: tail.x - 1, y: tail.y - 1}
  return tail;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n')

  const visited = new Set(["0;0"]);
  const head = {x: 0, y: 0};
  const tail = {x: 0, y: 0};

  const uniqueVisits = _.chain(input)
    .flatMap(instruction => {
      const [direction, steps] = instruction.split(' ');
      return _.times(parseInt(steps), _.constant(direction))
    })
    .reduce(({visited, head, tail}, direction) => {
      const newHead = move(head, direction);
      if (!areClose(newHead, tail)) {
        tail = follow(newHead, tail)
        visited.add(`${tail.x};${tail.y}`)
      }
      return {visited, head: newHead, tail}
    }, {visited, head, tail})
    .value()
    .visited
    .size

  return uniqueVisits;
}

const moveTailRec = (head: Point, tail: Point[], direction: string, visited: Set<string>): Point[] => {
  if (!tail.length) return [];
  if (areClose(head, tail[0])) return tail;

  const firstTail = follow(head, tail[0]);
  if (tail.length === 1) visited.add(`${firstTail.x};${firstTail.y}`)

  return [firstTail, ...moveTailRec(firstTail, tail.slice(1), direction, visited)];
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n')

  const visited = new Set(["0;0"]);
  const head = {x: 0, y: 0};
  const tail = _.times(9, _.constant({x: 0, y: 0}));

  const uniqueVisits = _.chain(input)
    .flatMap(instruction => {
      const [direction, steps] = instruction.split(' ');
      return _.times(parseInt(steps), _.constant(direction))
    })
    .reduce(({visited, head, tail}, direction) => {
      const newHead = move(head, direction);
      tail = moveTailRec(newHead, tail, direction, visited)
      return {visited, head: newHead, tail}
    }, {visited, head, tail})
    .value()
    .visited
    .size

  return uniqueVisits;
}

run({
  part1: {
    tests: [
      {
        input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
