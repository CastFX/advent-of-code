import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split('\n')

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return input.map((line) => {
    const matches = line.matchAll(/(\d)/g);
    if (! matches) return 0
    const digits = [...matches]
    const first_digit = digits[0][0]
    const last_digit = digits[digits.length - 1][0]

    return parseInt(first_digit + last_digit)
  }).reduce((a, b) => a + b, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const letterDigits: Record<string, string> = {
    'one': "1",
    'two': "2",
    'three': "3",
    'four': "4",
    'five': "5",
    'six': "6",
    'seven': "7",
    'eight': "8",
    'nine': "9",
  }

  const reverse = (str: string) => str.split('').reverse().join('')


  return input.map((line) => {

    const regex = Object.keys(letterDigits).join('|')

    const firstMatch = [...line.match(new RegExp(`\\d|${regex}`)) || []][0]
    const firstDigit = letterDigits[firstMatch] ?? firstMatch

    const lastMatch = reverse([...reverse(line).match(new RegExp(`\\d|${reverse(regex)}`)) || []][0])
    const lastDigit = letterDigits[lastMatch] ?? lastMatch

    return parseInt(firstDigit + lastDigit)
  }).reduce((a, b) => a + b, 0)
}

run({
  part1: {
    tests: [
      {
        input: `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
