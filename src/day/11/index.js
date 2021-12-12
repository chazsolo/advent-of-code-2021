const fs = require('fs');
const path = require('path');
const { identity } = require('../../util');

const file = path.join(__dirname, 'data.example.txt');
const data = fs.readFileSync(file, 'utf-8').split(/\r?\n/).slice(0, -1);

const octopi = data.map((row, y) => [...row].map((energy, x) => ({ energy: +energy, x, y }))).flat();

const getAdjacentOctopi = ({ x, y }) => [
  (octopi[y - 1] || [])[x],     // N
  (octopi[y - 1] || [])[x + 1], // NE
  octopi[y][x + 1],             // E
  (octopi[y + 1] || [])[x + 1], // SE
  (octopi[y + 1] || [])[x],     // S
  (octopi[y + 1] || [])[x - 1], // SW
  octopi[y][x - 1],             // W
  (octopi[y - 1] || [])[x - 1], // NW
].filter(identity);

const bumpEnergy = list => {
  list.forEach(({ x, y }) => {
    octopi[y][x].energy += 1;
  })
}

const step = () => {
  // 1. increase energy of all by 1
  bumpEnergy(octopi);

  // a flashing octopi is one with an energy of 0

  let flashingOctopi = []
  // 2. determine which ones flashed, then increase over adjacent octopi
  // Keep doing this until no more octopi flash
  flashingOctopi = octopi.reduce((fo, o) => o.energy > 9 ? [...fo, o] : fo, [])

  flashingOctopi.forEach((o) => {
    getAdjacentOctopi(o)
  })



}

step();
step();
step();




