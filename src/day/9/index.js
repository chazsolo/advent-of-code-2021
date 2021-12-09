const fs = require('fs');
const path = require('path');
const { identity, mult, sum } = require('../../util');

const file = path.join(__dirname, 'data.txt');
const data = fs.readFileSync(file, 'utf-8').split(/\r?\n/).filter(identity);

// setup
const heightMap = data.map((row, y) => (
  [...row].map((value, x) => ({ checked: false, value: +value, x, y }))
));

const isLowPoint = ({ x, y }) => {
  const { value } = heightMap[y][x];
  const adjacentValues = [
    heightMap[y - 1] && heightMap[y - 1][x],
    heightMap[y][x + 1] || false,
    heightMap[y + 1] && heightMap[y + 1][x],
    heightMap[y][x - 1] || false,
  ].filter(Boolean).map(({ value }) => value);

  return value < Math.min(...adjacentValues);
}
const lowPoints = heightMap.flat().reduce((ps, entry) => isLowPoint(entry) ? [...ps, entry] : ps, []);

// exercises
const part1 = () => lowPoints.reduce((total, { value }) => total + value + 1, 0);

const part2 = () => {
  const walkBasin = (x, y, prevValue = 0) => {
    const entry = (heightMap[y] || [])[x];
    let size = 0;

    if (entry && !entry.checked && entry.value >= prevValue && entry.value < 9) {
      entry.checked = true;
      size++;

      const adjacentEntries = [
        walkBasin(entry.x, entry.y - 1, entry.value), // N
        walkBasin(entry.x + 1, entry.y, entry.value), // E
        walkBasin(entry.x, entry.y + 1, entry.value), // S
        walkBasin(entry.x - 1, entry.y, entry.value), // W
      ].filter(Number.isInteger);

      size += adjacentEntries.reduce(sum);
    }

    return size;
  }

  return lowPoints.map(entry => walkBasin(entry.x, entry.y, entry.value))
    .sort((a, b) => b - a) // sort in reverse
    .slice(0, 3) // get first three (largest)
    .reduce(mult) // multiply the values together
}

module.exports = {
  exercises: [part1, part2],
  name: 'Smoke em if you got em',
}
