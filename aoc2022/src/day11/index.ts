import run from "aocrunner"
import _, { result } from "lodash";

class Monkey {
  name: number;
  items: number[];
  operation: (x: number) => number;
  test: (x: number) => number;
  inspected: number;

  constructor(name: number, items: number[], operation: (x: number) => number, test: (x: number) => number) {
    this.name = name;
    this.items = items;
    this.operation = operation;
    this.test = test;
    this.inspected = 0;
  }
}

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n\n')

  const monkeys: Monkey[] = _.chain(input)
    .map(monkey => {
      const [
        heading,
        startingItems,
        operation,
        test,
        conditionTrue,
        conditionFalse
      ] = monkey.split('\n').map(x => x.trim());

      const name = parseInt(heading.split(' ')[1])

      const starting = startingItems
        .split("Starting items: ")[1]
        .split(', ')
        .map(x => parseInt(x))

      const op = (old: number) => eval(operation.split("Operation: new = ")[1])

      const divisor = parseInt(test.split("Test: divisible by ")[1])
      const monkeyTrue = parseInt(conditionTrue.split("If true: throw to monkey ")[1])
      const monkeyFalse = parseInt(conditionFalse.split("If false: throw to monkey ")[1])
      const testFunction = (x: number) => x % divisor === 0 ? monkeyTrue : monkeyFalse

      return new Monkey(name, starting, op, testFunction)
    })
    .value()

    const result = _.chain(_.range(0,20))
      .reduce((monkeys, k) => {
        monkeys.forEach(m => {
          m.items.forEach(i => {
            m.inspected++;
            // console.log(`Monkey ${m.name} inspected ${i}`)
            const newItem = Math.floor(m.operation(i) / 3)
            const newMonkey = m.test(newItem)
            // console.log(`Monkey ${m.name} threw item to ${newMonkey}`)
            monkeys[newMonkey].items.push(newItem)
          })
          m.items = []
        });

        monkeys.forEach(m => console.log(`${k} - Monkey ${m.name} inspected items ${m.inspected} times`))
        return monkeys;
      }, monkeys)
      .map(m => m.inspected)
      .sort((a,b) => b-a)
      .take(2)
      .reduce((product, value) => product * value, 1)
      .value()

  return result;
}

class Monkey2 {
  name: number;
  items: PrimeRemainder[];
  operation: (x: PrimeRemainder) => PrimeRemainder;
  test: (x: PrimeRemainder) => number;
  inspected: number;

  constructor(name: number, items: PrimeRemainder[], operation: (x: PrimeRemainder) => PrimeRemainder, test: (x: PrimeRemainder) => number) {
    this.name = name;
    this.items = items;
    this.operation = operation;
    this.test = test;
    this.inspected = 0;
  }
}

type PrimeRemainder = {
  [key: number]: number;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n\n')

  const primeNumbers = rawInput.split('\n')
    .filter(line => line.includes("Test: divisible by"))
    .map(line => parseInt(line.split("Test: divisible by ")[1]))

  const monkeys: Monkey2[] = _.chain(input)
    .map(monkey => {
      const [
        heading,
        startingItems,
        operation,
        test,
        conditionTrue,
        conditionFalse
      ] = monkey.split('\n').map(x => x.trim());

      const name = parseInt(heading.split(' ')[1])

      const starting: PrimeRemainder[] = startingItems
        .split("Starting items: ")[1]
        .split(', ')
        .map(r => {
          console.log('a: ', r)
          const n = parseInt(r)
          return _.chain(primeNumbers)
            .keyBy(_.identity)
            .mapValues(p => n % p)
            .value()
        })

      const rhs = operation.split("Operation: new = ")[1];
      const op = (old: PrimeRemainder) => {
        if (rhs === "old * old") {
          return _.mapValues(old, (remainder, prime) => (remainder * remainder) % parseInt(prime))
        }
        if (rhs.includes("*")) {
          const n = parseInt(rhs.split(' * ')[1]);
          return _.mapValues(old, (remainder, prime) => (remainder * n) % parseInt(prime))
        }
        if (rhs.includes("+")) {
          const n = parseInt(rhs.split(' + ')[1]);
          return _.mapValues(old, (remainder, prime) => (remainder + n) % parseInt(prime))
        }
        return old
      }
      const divisor = parseInt(test.split("Test: divisible by ")[1])
      const monkeyTrue = parseInt(conditionTrue.split("If true: throw to monkey ")[1])
      const monkeyFalse = parseInt(conditionFalse.split("If false: throw to monkey ")[1])
      const testFunction = (x: PrimeRemainder) => x[divisor] === 0 ? monkeyTrue : monkeyFalse

      return new Monkey2(name, starting, op, testFunction)
    })
    .value()

    console.log(monkeys.map(x => x.items))

    const result = _.chain(_.range(0,10000))
      .reduce((monkeys, k) => {
        monkeys.forEach(m => {
          m.items.forEach(i => {
            m.inspected++;
            // console.log(`${k} - Monkey ${m.name} inspected`)
            const newItem = m.operation(i)
            const newMonkey = m.test(newItem)
            // console.log(`${k} - Monkey ${m.name} threw item to ${newMonkey}`)
            monkeys[newMonkey].items.push(newItem)
          })
          m.items = []
        });

        return monkeys;
      }, monkeys)
      .map(m => m.inspected)
      .sort((a,b) => b-a)
      .take(2)
      .reduce((product, value) => product * value, 1)
      .value()

  return result;
}

run({
  part1: {
    tests: [
      {
        input: `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`,
        expected: 10605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
