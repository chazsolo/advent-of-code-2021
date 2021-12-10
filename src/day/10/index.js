const fs = require('fs');
const path = require('path');
const { sum } = require('../../util');

const file = path.join(__dirname, 'data.txt');
const data = fs.readFileSync(file, 'utf-8').split(/\r?\n/);
data.pop(); // remove last empty-string line

const [opening, closing] = ['([{<', ')]}>'];
const matchMap = new Map([[')', '('], [']', '['], ['}', '{'], ['>', '<']]);
const reverseMatchMap = new Map([['(', ')'], ['[', ']'], ['{', '}'], ['<', '>']]);
const corruptedLineNumbers = [];

const part1 = () => {
  const corruptedPointMap = new Map([[')', 3], [']', 57], ['}', 1197], ['>', 25137]]);
  const stack = [];
  const corruptedLines = data.reduce((cL, line, row) => {
    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (opening.includes(char)) stack.push(char);
      if (closing.includes(char)) {
        const lastOpened = stack.pop();

        if (matchMap.get(char) !== lastOpened) {
          corruptedLineNumbers.push(row);
          return [...cL, char];
        }
      }
    }

    return cL;
  }, []);

  return corruptedLines.map(char => corruptedPointMap.get(char)).reduce(sum);
}

const part2 = () => { // *** This requires Part 1 to run first! (dependent on corruptedLineNumbers)
  const incompletePointMap = new Map([[')', 1], [']', 2], ['}', 3], ['>', 4]]);
  const incompleteLines = data.filter((_, ln) => !corruptedLineNumbers.includes(ln))

  const scores = incompleteLines.reduce((lineScores, line) => {
    const stack = [];
    for (let i = 0; i < line.length; i++) {
      opening.includes(line[i]) ? stack.push(line[i]) : stack.pop();
    }

    const lineScore = stack.reverse()
      .map(char => incompletePointMap.get(reverseMatchMap.get(char)))
      .reduce((score, point) => score * 5 + point, 0);

    return [...lineScores, lineScore];
  }, [])

  // return middle score
  return scores.sort((a, b) => a - b)[~~(scores.length / 2)];
}

module.exports = {
  exercises: [part1, part2],
  name: 'Syntax syn tax',
}
