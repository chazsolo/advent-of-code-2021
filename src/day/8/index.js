const fs = require('fs');
const path = require('path');
const { identity, sum } = require('../../util');

const file = path.join(__dirname, 'data.example.txt');
const data = fs.readFileSync(file, 'utf-8').toString().split(/\r?\n/).filter(identity);

const part1 = () => {
  const outputValues = data.map(s => s.split(' | ')[1].split(' ')).flat();
  const acceptedLengths = [2, 4, 3, 7];

  // find values that are unique in length (1, 4, 7, 8)
  const uniqueNumberSegmentCount = outputValues.reduce(
    (count, value) => count + acceptedLengths.includes(value.length),
    0
  );

  console.log(uniqueNumberSegmentCount);
}

// part1();

const lengthMap = new Map();
lengthMap.set(2, [1]);
lengthMap.set(3, [7]);
lengthMap.set(4, [4]);
lengthMap.set(5, [2, 3, 5]);
lengthMap.set(6, [0, 6, 9]);
lengthMap.set(7, [8]);

// given a list of strings, return a function that takes in a string as input
// and returns a single digit value representation
const decode = (strings) => {
  // set up unique lengths first (1 [2], 4 [4], 7 [3], and 8 [7])
  // const mapper = { 2: 1, 4: 4, 3: 7, 7: 8 };




  return (input) => {

  }
}

const part2 = () => {
  const splitData = data.map((entry) => entry.split(' | ').map(values => values.split(' ')));

  console.log('splitData', splitData);
}

part2();

// module.exports = {
//   exercises: [part1],
// }
