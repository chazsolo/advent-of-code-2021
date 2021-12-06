const fs = require('fs');
const clone = require('rfdc')();
const { clamp, identity } = require('./util');

const data = fs.readFileSync('./data/day5.txt', 'utf-8').split(/\r?\n/).filter(identity);

const samePoint = (p1, p2) => p1.x === p2.x && p1.y === p2.y;
const drawLine = ([p1, p2], grid) => {
  const xDiff = p2.x - p1.x;
  const yDiff = p2.y - p1.y;

  const vector = {
    x: clamp(-1, 1)(xDiff),
    y: clamp(-1, 1)(yDiff),
  }
  let px = p1.x;
  let py = p1.y;

  do {
    grid[py][px] = grid[py][px] + 1;
    px += vector.x;
    py += vector.y;
  } while (!samePoint({ x: px, y: py }, p2))

  // do endpoint last (since the while loop halts on it)
  grid[p2.y][p2.x] = grid[p2.y][p2.x] + 1;

  return grid;
};
const getCount = (grid, n) => grid.reduce((c1, row) => {
  c1 += row.reduce((c2, column) => c2 + +(column >= n), 0);
  return c1;
}, 0)

// max x for grid
let gridX = 0;
// max y for grid
let gridY = 0;

// prep lines into [[{1}, {2}],...] point structure
const lines = data.map(d => {
  const [p1, p2] = d.split(' -> ');
  const [x1, y1] = p1.split(',');
  const [x2, y2] = p2.split(',');

  // update max grid x/y
  gridX = Math.max(+x1, +x2, gridX);
  gridY = Math.max(+y1, +y2, gridY);

  return [{ x: +x1, y: +y1 }, { x: +x2, y: +y2 }];
});

(function part1() {
  console.time('Part 1');

  let grid = Array.from({ length: gridY + 1 }, () => new Array(gridX + 1).fill(0));

  // filter out diagonal lines first
  const pLines = clone(lines).filter(([p1, p2]) => (p1.x === p2.x) || (p1.y === p2.y));
  pLines.forEach((line) => drawLine(line, grid));
  const count = getCount(grid, 2);

  console.log('count part 1', count);
  console.timeEnd('Part 1');
})();

(function part2() {
  console.time('Part 2');

  let grid = Array.from({ length: gridY + 1 }, () => new Array(gridX + 1).fill(0));
  clone(lines).forEach(line => drawLine(line, grid));
  const count = getCount(grid, 2);

  console.log('count part 2', count);
  console.timeEnd('Part 2');
})();
