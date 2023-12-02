import run from "aocrunner"


const parseInput = (rawInput: string) => rawInput
  .split('\n')
  .map(line => line.split(": ")[1])
  .map(games => games.split(";")
    .map(game => game.split(", ").map(s => s.trim())))


type ColorMaxes = {'blue': number, 'red': number, 'green': number}

const maxOutputs = (maxes: ColorMaxes, tries: string[]) => {
  return tries.reduce((acc, b) => {
    const amount = parseInt(b)
    const color = b.split(" ")[1] as keyof ColorMaxes
    acc[color] = Math.max(acc[color] ?? 0, amount)
    return acc
  }, maxes)
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const gameMaxes = input.map((games) =>
    games.reduce(maxOutputs, {} as ColorMaxes))

  const isAllowed = (maxes: ColorMaxes, index: number) =>
    (maxes['red'] <= 12 &&
    maxes['green'] <= 13 &&
    maxes['blue'] <= 14)
      ? [index+1]
      : []

  return gameMaxes.flatMap(isAllowed).reduce((a, b) => a + b)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const gameMaxes = input.map((games) =>
    games.reduce(maxOutputs, {} as ColorMaxes))

  return gameMaxes
    .map(maxes => Object.values(maxes).reduce((a,b) => a*b))
    .reduce((a, b) => a+b)




  return
}

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
  Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
