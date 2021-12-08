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

const part1 = d => () => {
  const fishies = simulateFishBreedingCycle([...d], 80);
  return fishies.reduce(sum);
}

const part2 = d => () => {
  const fishies = simulateFishBreedingCycle([...d], 256);
  return fishies.reduce(sum);
}

module.exports = {
  exercises: [part1([...days]), part2([...days])],
}
