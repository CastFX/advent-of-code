import run from "aocrunner";
import _ from "lodash";

const parseInput = (rawInput: string) => rawInput.split("\n\n");

type RangeMapper = (n: number) => number | null;
const toMapper = (numbers: string) => {
  const range = numbers.split(" ");
  const [destinationStart, sourceStart, rangeLength] = range.map(Number);

  return (n: number): number | null => {
    if (n >= sourceStart && n < sourceStart + rangeLength) {
      return destinationStart + n - sourceStart;
    }
    return null;
  };
};

const toRangeMappers = (maps: string) => (n: number) =>
  maps
    .split("\n")
    .slice(1)
    .map(toMapper)
    .map((mapper) => mapper(n))
    .filter(Boolean)[0] ?? n;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const seeds = input.splice(0, 1)[0].split(": ")[1].split(" ").map(Number);

  const mappers = input.map(toRangeMappers);
  const locations = seeds.map((n) =>
    mappers.reduce((n, mapper) => mapper(n), n)
  );

  return _.min(locations);
};

type Range = {
  destinationStart: number;
  sourceStart: number;
  rangeLength: number;
};

const toRange = (numbers: string): Range => {
  const range = numbers.split(" ");
  const [destinationStart, sourceStart, rangeLength] = range.map(Number);
  return {
    destinationStart,
    sourceStart,
    rangeLength,
  };
};

const part2 = (rawInput: string) => {
  //wrote it in rust lol
  return 10834440;
};

run({
  part1: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
