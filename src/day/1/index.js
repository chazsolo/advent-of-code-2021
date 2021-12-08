const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'data.txt');
const data = fs.readFileSync(file, 'utf-8').toString().split(/\r?\n/);

const incReduce = (increments, value, index, array) => {
  increments += value < array[index + 1] ? 1 : 0;
  return increments;
}

const part1 = () => {
  return data.reduce(incReduce, 0);
}

const part2 = () => {
  return data.map((v, i) => {
    if (data[i] && data[i + 1] && data[i + 2]) {
      return data[i] + data[i + 1] + data[i + 2]
    }
  }).filter(Boolean).reduce(incReduce, 0);
}

module.exports = {
  exercises: [part1, part2],
}
