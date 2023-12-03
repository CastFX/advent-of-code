import run from "aocrunner"
import _ from "lodash"

type Position = {
  value: string | number;
  startIndex: number;
  endIndex: number;
}

const parseInput = (rawInput: string) => rawInput.split('\n')
  .map(line => {
    const numberMatches = [...line.matchAll(/(\d+)/gm)];
    const symbolMatches = [...line.matchAll(/([^\d\.\s])/gm)];

    const toIndices = (match: RegExpMatchArray): Position => {
      const value = match[0]
      const startIndex = match['index']!
      const endIndex = startIndex + match[0].length - 1
      return {value, startIndex, endIndex}
    }

    return {
      numbers: numberMatches.map(toIndices),
      symbols: symbolMatches.map(toIndices),
    }
  })

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const symbolPositions = input.map(({symbols}) => symbols)
  const numberPositions = input.map(({numbers}) => numbers.map(pos => ({...pos, value: Number(pos.value)})))


  const isNearbyToSymbols = (numberPosition: Position, lineIndex: number): boolean => {
    const {startIndex, endIndex} = numberPosition
    const symbolsLineAbove = (lineIndex - 1 >= 0 ? symbolPositions[lineIndex - 1] : []).map(pos => pos.startIndex)
    const symbolsLineBelow = (lineIndex + 1 < symbolPositions.length ? symbolPositions[lineIndex + 1] : []).map(pos => pos.startIndex)
    const symbolsLineSame = symbolPositions[lineIndex].map(pos => pos.startIndex)

    const adjacentAbove = _.intersection(_.range(startIndex - 1, endIndex + 2), symbolsLineAbove)
    const adjacentSame = _.intersection([startIndex - 1, endIndex + 1], symbolsLineSame)
    const adjacentBelow = _.intersection(_.range(startIndex - 1, endIndex + 2), symbolsLineBelow)

    return adjacentAbove.length >= 1 || adjacentSame.length >= 1 || adjacentBelow.length >= 1
  }


  return numberPositions
    .map((line, lineIndex) => line.filter(numberPos => isNearbyToSymbols(numberPos, lineIndex)))
    .map(line => _.sumBy(line, 'value'))
    .reduce((sum, value) => sum + value)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const gearPositions = input.map(({symbols}) => symbols.filter(s => s.value === '*'))
  const numberPositions = input.map(({numbers}) => numbers.map(pos => ({...pos, value: Number(pos.value)})))

  const mapGearToFactorsMultiplied = (gearPosition: Position, lineIndex: number) => {
    const numbersLineAbove = (lineIndex - 1 >= 0 ? numberPositions[lineIndex - 1] : [])
    const numbersLineBelow = (lineIndex + 1 < numberPositions.length ? numberPositions[lineIndex + 1] : [])
    const numbersLineSame = numberPositions[lineIndex]

    const isAdjacent = (pos: Position) => _.range(pos.startIndex - 1, pos.endIndex + 2).includes(gearPosition.startIndex)

    const adjacent = [
      ...numbersLineAbove.filter(isAdjacent).map(n => n.value),
      ...numbersLineSame.filter(isAdjacent).map(n => n.value),
      ...numbersLineBelow.filter(isAdjacent).map(n => n.value),
    ]

    return adjacent.length == 2 ? (adjacent[0]! * adjacent[1]!) : 0
  }

  return gearPositions
    .map((line, lineIndex) => line.map(gearPos => mapGearToFactorsMultiplied(gearPos, lineIndex)))
    .map(_.sum)
    .reduce((a, b) => a + b)
}

run({
  part1: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
