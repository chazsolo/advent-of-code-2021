const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'data.txt');

const coordinates = [];
const instructions = [];

fs.readFileSync(file, 'utf-8').split(/\r?\n/).forEach(line => {
  if (line.match(/\d,\d/)) {
    const [x, y] = line.split(',');
    coordinates.push([+x, +y]);
  } else if (line.match(/^fold/)) {
    const [direction, value] = line.match(/^fold along (.=\d+)$/)[1].split('=');
    instructions.push([direction, +value]);
  }
});

const foldMapper = ([direction, value]) => points => {
  const mapper = {
    x: ([x, y]) => [+value - Math.abs(x - +value), y],
    y: ([x, y]) => [x, +value - Math.abs(y - +value)],
  }[direction];

  return points.map(mapper);
}

const toBuffer = grid => (
  grid.reduce((buffer, row) => (
    buffer + row.reduce((rowStr, char) => rowStr + char, '') + '\n'), ''
  )
);

const uniquePoints = points => new Set(points.map(p => p.toString()));

const part1 = () => {
  const [firstFold] = instructions;
  const step1 = foldMapper(firstFold)(coordinates);

  return uniquePoints(step1).size;
}

const part2 = () => {
  // get all points after folds (there will be duplicates)
  const points = instructions.reduce((ps, instruction) => foldMapper(instruction)(ps), [...coordinates]);

  // get max x and max y to build an array
  const [maxX, maxY] = points.reduce(([mX, mY], [x, y]) => [Math.max(mX, x), Math.max(mY, y)], [0, 0]);
  const outputGrid = Array.from({ length: maxY + 1 }, () => new Array(maxX + 1).fill(' '));

  points.forEach(([x, y]) => outputGrid[y][x] = '#');

  // console.log(toBuffer(outputGrid));
  return 'check console';
}

module.exports = {
  exercises: [part1, part2],
  name: 'Transparent Origami',
}
