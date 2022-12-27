import run from "aocrunner"
import _ from "lodash";

const parseInput = (rawInput: string) => rawInput


type Packet =  number | Packet[];

const isOrderOk = (left: Packet|undefined, right: Packet|undefined): boolean|null => {
  if (left == null && right != null) return true;
  if (right == null) return false;
  if (_.isNumber(left) && _.isNumber(right)) {
    if (left === right) return null; //continue
    return left < right;
  }
  if (_.isNumber(left) && _.isArray(right)) return isOrderOk([left], right);
  if (_.isArray(left) && _.isNumber(right)) return isOrderOk(left, [right]);
  if (_.isArray(left) && _.isArray(right)) {
    return _.chain(_.zip(left, right))
      .reduce((isOk, [innerLeft, innerRight]) =>
          isOk ?? isOrderOk(innerLeft, innerRight)
      , null as boolean|null)
      .value()
  }
  return null
}

const parsePacket = (line: string): Packet => {
  return JSON.parse(line);
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return _.chain(input)
    .split('\n\n')
    .map(lines => lines.split('\n').map(line => parsePacket(line)))
    .map(([left, right], i) => isOrderOk(left, right) ? i+1: 0)
    .sum()
    .value();
}

const packetSorter = (p1: Packet, p2: Packet): number => {
  const res = isOrderOk(p1, p2);
  if (res === null) return 0;
  if (res) return -1;
  else return 1;
}

const part2 = (rawInput: string) => {
  const divider1 = parsePacket("[[2]]");
  const divider2 = parsePacket("[[6]]");
  const input = parseInput(rawInput)
    .split('\n')
    .filter(line => !!line)
    .map(line => parsePacket(line));

  input.push(divider1, divider2);

  const sorted = input.sort(packetSorter)
  return (1 + sorted.indexOf(divider1)) * (1 + sorted.indexOf(divider2));
}

run({
  part1: {
    tests: [
      {
        input: `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`,
        expected: 140,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
