import run from "aocrunner"
import _ from "lodash";

const parseInput = (rawInput: string): {drawnNumbers: string[], boards: string[][][]} => {
  const lines = rawInput.split('\n');
  const drawnNumbers = lines[0].split(',').filter(s => s.trim());
  const boardLines = _.drop(lines, 2).filter(s => s.trim()).map(s => s.split(' ').filter(s => s.trim()));
  const boards = _.chunk(boardLines, 5);

  return ({drawnNumbers, boards});
}

const part1 = (rawInput: string) => {
  const {drawnNumbers, boards} = parseInput(rawInput)
  const getScore = (drawnNumberIndex: number): number => {
    if (drawnNumberIndex >= drawnNumbers.length) return 0;
    const drawnNumbersSoFar = _.take(drawnNumbers, drawnNumberIndex);
    const winningBoard = boards.find(board => isBoardWinning(board, drawnNumbersSoFar));
    if (winningBoard) return calculateScore(winningBoard, drawnNumbersSoFar);

    return getScore(drawnNumberIndex + 1);
  }

  return getScore(0);
}


const part2 = (rawInput: string) => {
  const {drawnNumbers, boards} = parseInput(rawInput)

  class WinningBoardsForIndex {
    drawnNumberIndex: number;
    board: string[][];
    
    constructor(drawnNumberIndex: number, board: string[][]) {
      this.drawnNumberIndex = drawnNumberIndex;
      this.board = board;
    }
  }  

  const getAllWinningBoards = (
    drawnNumberIndex: number,
    boards: string[][][],
    winningBoards: WinningBoardsForIndex[]
  ): WinningBoardsForIndex[] => {
    if (drawnNumbers.length === drawnNumberIndex) {
      return winningBoards;
    }
    
    const drawnNumbersSoFar = _.take(drawnNumbers, drawnNumberIndex);
    const [newWinningBoards, losingBoards] = _.partition(boards, board => 
      isBoardWinning(board, drawnNumbersSoFar));

    const newWinningBoardsForIndex = newWinningBoards.map(board => 
      new WinningBoardsForIndex(drawnNumberIndex, board));

    return getAllWinningBoards(drawnNumberIndex+1, losingBoards, [...winningBoards, ...newWinningBoardsForIndex]);
  }
  const {board, drawnNumberIndex} = _.last(getAllWinningBoards(0, boards, []))!!
  return calculateScore(board, _.take(drawnNumbers, drawnNumberIndex));
}

const isBoardWinning = (board: string[][], drawnNumbersSoFar: string[]): boolean => 
  isBoardWinningHorizontally(board, drawnNumbersSoFar) ||
  isBoardWinningVertically(board, drawnNumbersSoFar);

const isBoardWinningHorizontally = (board: string[][], drawnNumbersSoFar: string[]): boolean => 
  board.some(line => 
    line.every(n => drawnNumbersSoFar.includes(n))
  );

const isBoardWinningVertically = (board: string[][], drawnNumbersSoFar: string[]): boolean => {
  for (let i = 0; i < board[0].length; i++) {
    let found = true;
    for (let j = 0; j < board.length; j++) {
      if (!drawnNumbersSoFar.includes(board[j][i])) {
        found = false;
        break;
      }
    }
    if (found) return true;
  }
  return false;
}

const calculateScore = (board: string[][], drawnNumbersSoFar: string[]): number => {
  const lastNumber = parseInt(_.last(drawnNumbersSoFar)!!);
  console.log(lastNumber);
  const boardWithUnmarkedNumbers = board.map(line => line.filter(n => !drawnNumbersSoFar.includes(n)));
  const sumOfUnMarkedNumbers = _.sumBy(boardWithUnmarkedNumbers, line => _.sumBy(line, n => parseInt(n)));
  return lastNumber * sumOfUnMarkedNumbers;
}

run({
  part1: {
    tests: [
      { input: `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
8  2 23  4 24
21  9 14 16  7
6 10  3 18  5
1 12 20 15 19

3 15  0  2 22
9 18 13 17  5
19  8  7 25 23
20 11 10 24 4
14 21 16 12 6

14 21 17 24 4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
2  0 12  3  7`, expected: 4512 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
8  2 23  4 24
21  9 14 16  7
6 10  3 18  5
1 12 20 15 19

3 15  0  2 22
9 18 13 17  5
19  8  7 25 23
20 11 10 24 4
14 21 16 12 6

14 21 17 24 4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
2  0 12  3  7`, expected: 1924},
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
