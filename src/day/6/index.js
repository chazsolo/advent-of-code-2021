const fs = require('fs');
const path = require('path');
const { sum } = require('../../util');

const file = path.join(__dirname, 'data.txt');
const data = fs.readFileSync(file, 'utf-8').toString().split(',');

// prepare day array and fill with fish per day
const days = Array.from({ length: 9 }).fill(0);
data.forEach(fish => days[+fish]++);

function simulateFishBreedingCycle(fishies, days) {
  while (days--) {
    const dayZero = fishies.shift(); // pull those on day zero out of list...
    fishies.push(dayZero); // ..."new" fishies are on day 8...
    fishies[6] += dayZero; // ...and old fishies are on day 6
  }

  return fishies;
}

(function part1() {
  console.time('part 1');
  const fishies = simulateFishBreedingCycle([...days], 80);

  console.log('part 1 fishies', fishies.reduce(sum));
  console.timeEnd('part 1');
})();

(function part2() {
  console.time('part 2');
  const fishies = simulateFishBreedingCycle([...days], 256);

  console.log('part 2 fishies', fishies.reduce(sum));
  console.timeEnd('part 2');
})();
