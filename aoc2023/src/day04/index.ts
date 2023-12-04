import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput: string) => rawInput
  .split('\n')
  .map(line => line
    .split(': ')[1]
    .split(" | ")
    .map(numbers => numbers
      .split(' ')
      .flatMap(s => parseInt(s) ? [parseInt(s)] : [])))



const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const toScore = (cards: number[][]) => {
    const winning = _.intersection(cards[0], cards[1]).length
    return winning > 0 ? Math.pow(2, winning-1) : 0
  }

  return input.map(toScore).reduce((a, b) => a + b)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).map(cards => _.intersection(cards[0], cards[1]).length)

  const results: {[key: number]: number} = _.range(input.length).reduce((a, b) => ({...a, [b]: 1}), {})



  input.reduce((resAcc, winningNumbers, cardIndex) => {
    const addCopyCards = () => _.range(cardIndex+1, cardIndex+winningNumbers+1)
      .forEach(j => resAcc[j] += 1)

    _.times(resAcc[cardIndex], addCopyCards)
    return resAcc
  }, results)

  return Object.values(results).reduce((a, b) => a + b, 0)
}

run({
  part1: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
      input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
