const fs = require('fs');
const { identity, sum } = require('../../util');

/**
 * Given a board, return true if a winner is found, false if not
 * @param {number[][]} board
 * @param {number[]} drawn
 * @returns {boolean}
 */
const checkBoard = (board, drawn) => {
  // check rows first
  let win = board.filter((row) => row.every(n => drawn.includes(n))).length >= 1;

  // then check columns
  for (let i = 0; i < board.length; i++) {
    const column = [board[i][0], board[i][1], board[i][2], board[i][3], board[i][4]];
    win = column.every(n => drawn.includes(n));

    if (win) break;
  }

  return win;
}

const calculateAnswer = (board, drawnNumbers) => {
  // get the number that was most recently drawn
  const finalDrawn = drawnNumbers[drawnNumbers.length - 1];

  console.log(board);

  // get all unmarked numbers on the board
  const unmarkedValues = [
    ...board[0],
    ...board[1],
    ...board[2],
    ...board[3],
    ...board[4],
  ].filter(v => !drawnNumbers.includes(v));

  const unmarkedValuesSum = unmarkedValues.reduce(sum);

  // multiply finalDrawn by sum of unmarkedValues
  return finalDrawn * unmarkedValuesSum;
}

const lines = fs.readFileSync('./data.txt', 'utf-8').split(/\r?\n/).filter(identity);
const gameNumbers = lines.shift().split(',').map(n => +n);
const boards = new Map();

let boardId = 0;
while (lines.length) {
  const rows = lines.splice(0, 5);
  const board = rows.map((rowData) => rowData.split(' ').filter(identity).map(n => +n))

  boards.set(boardId++, board);
}

function part1() {
  let winningBoard = null;
  let winningDrawn = [];
  let turn = 5; // start at turn 5, need at least 5 turns to have the first win

  // play
  while (!winningBoard) {
    // get the drawn numbers
    const drawn = gameNumbers.slice(0, turn);

    for (const [id, board] of boards) {
      const win = checkBoard(board, drawn);

      if (win) {
        winningBoard = boards.get(id);
        winningDrawn = [...drawn];
      }
    }

    turn++;
  }

  const answer = calculateAnswer(winningBoard, winningDrawn);

  console.log('part 1 answer', answer);
}

(function part2() {
  // figure out which board is the last one to win. to do so, run each turn and when a board wins
  // remove it from the Map of boards. Once the Map has a single board left, we have our answer.
  // TODO doesn't work
  let lastBoardLeft;
  let winningDrawn = [];
  let turn = 5; // start at turn 5, need at least 5 turns to have the first win

  // play
  while (boards.size > 1) {
    // console.log('turn', turn, '--------------');
    // get the drawn numbers
    const drawn = gameNumbers.slice(0, turn);

    for (const [id, board] of boards) {
      const win = checkBoard(board, drawn);

      if (win) {
        // console.log('deleting board', id);
        boards.delete(id);
      }
    }

    // console.log('boards left', boards.size);

    winningDrawn = [...drawn];

    turn++;
  }

  // at this point there should be only one board left
  lastBoardLeft = boards.get([...boards.keys()][0]);

  const answer = calculateAnswer(lastBoardLeft, winningDrawn);

  console.log('part 2 answer', answer);
})();
