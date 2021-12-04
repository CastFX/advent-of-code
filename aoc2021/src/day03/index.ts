import run from "aocrunner"
import _ from 'lodash';

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n');
  const frequencyRateOfBits = getFrequencyRateOfBits(input);

  const gammaRate = getGammaRateBitString(frequencyRateOfBits);
  const epsilonRate = getEpsilonRateBitString(frequencyRateOfBits);

  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n');
  
  // iterative version
  // let bitStrings = input;
  // let i = 0;
  // while(bitStrings.length > 1) {
  //   const frequencyRateOfBits = getFrequencyRateOfBits(bitStrings);
  //   const gammaRateBitString = getGammaRateBitString(frequencyRateOfBits);
  //   bitStrings = bitStrings.filter(bitString => bitString.split('')[i] === gammaRateBitString.split('')[i])
  //   i++;
  // }
  // const o2GeneratorRating = input[0];

  
  // iterative version
  // bitStrings = input;
  // i = 0;
  // while(bitStrings.length > 1) {
  //   const frequencyRateOfBits = getFrequencyRateOfBits(bitStrings);
  //   const epsilonRateBitString = getEpsilonRateBitString(frequencyRateOfBits);
  //   bitStrings = bitStrings.filter(bitString => 
  //     bitString.split('')[i] === epsilonRateBitString.split('')[i])
  //   i++;
  // }
  // const co2scrubberRating = input[0];

  const o2Generator = getO2GeneratorRating(input, 0);
  const co2scrubber = getCO2GeneratorRating(input, 0);

  return parseInt(o2Generator, 2) * parseInt(co2scrubber, 2);
}

const O2FilterFunction = (
  bitString: string,
  frequencyRate: number[],
  index: number,
): boolean => {
  const value = bitString.split('')[index];
  const frequency = frequencyRate[index];
  return value === gammaMapping(frequency);
}

const CO2FilterFunction = (
  bitString: string,
  frequencyRate: number[],
  index: number,
): boolean => {
  const value = bitString.split('')[index];
  const frequency = frequencyRate[index];
  return value === epsilonMapping(frequency);
}

const getO2GeneratorRating = (input: string[], index: number): string => {
  if (input.length <= 1) return input[0];

  const frequencyRate = getFrequencyRateOfBits(input);
  const filteredInput = input.filter(bitString => 
    O2FilterFunction(bitString, frequencyRate, index)
  );
  return getO2GeneratorRating(filteredInput, index+1);
}

const getCO2GeneratorRating = (input: string[], index: number): string => {
  if (input.length <= 1) return input[0];

  const frequencyRate = getFrequencyRateOfBits(input);
  const filteredInput = input.filter(bitString => 
    CO2FilterFunction(bitString, frequencyRate, index)
  );
  return getCO2GeneratorRating(filteredInput, index+1);
}

const gammaMapping = (bit: number): string => 
  bit >= 0 ? '0' : '1';

const epsilonMapping = (bit: number): string => 
  bit >= 0 ? '1' : '0'

const getGammaRateBitString = (frequencyRateOfBits: number[]): string =>
  frequencyRateOfBits.map(gammaMapping).join('');

const getEpsilonRateBitString = (frequencyRateOfBits: number[]): string =>
  frequencyRateOfBits.map(epsilonMapping).join('');

const getFrequencyRateOfBits = (input: string[]): number[] => {
  return input.reduce((acc, binary) => {
    const increased = _
      .zip(acc, binary.trim().split(''))
      .map(([accBinary, bit]) => accBinary + (bit === '0' ? -1 : 1));
    
    return increased;

  }, new Array(input[0].length).fill(0));
}

run({
  part1: {
    tests: [
      { input: `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`,
      expected: 198 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`, expected: 230 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
