import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const inputArray = [...input].map(s => parseInt(s));

  let currentIndex = 0;

  for (let i = 0; i < 100; i++) {
    console.log("inputArray", inputArray, "currentIndex", currentIndex);

    let after = Math.min(3, inputArray.length - (currentIndex + 1));
    let start = 3 - after;
    let deleted = [...inputArray.splice(currentIndex+1, after), ...inputArray.splice(0, start)];
    let currentValue = inputArray[currentIndex];


    // console.log("inputArray", inputArray);
    let destinationValue = currentValue;
    let maxCycles = 1000;
    do {
      destinationValue--;
      let destinationIndex = inputArray.indexOf(destinationValue);
      if (destinationIndex >= 0) {
        inputArray.splice(destinationIndex, 0, ...deleted);
        break;
      }

      maxCycles--;
    } while (maxCycles > 0);

    currentIndex = (1 + currentIndex) % inputArray.length;
  }

  return resultString(inputArray);
}

const resultString = (inputArray: number[]) => {
  let res = "";
  while (inputArray.length > 1) {
    const indexOf1 = inputArray.indexOf(1);
    res += inputArray.splice((indexOf1 + 1) % inputArray.length, 1);
  }
  //5 (8) 3  7  4  1  9  2  6, res=""
  //5 (8) 3  7  4  1  2  6, res="9"
  //5 (8) 3  7  4  1  6, res="92"
  //5 (8) 3  7  4  1, res="926"
  //5 (8) 3  7  4  1, res="926"
  //(8) 3  7  4  1, res="9265"
  //() 3  7  4  1, res="92658"

  return res;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

run({
  part1: {
    tests: [
      { input: `389125467`, expected: "67384529" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",.
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
