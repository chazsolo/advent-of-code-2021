const fs = require('fs');
const path = require('path');
const { sum } = require('../../util');

const file = path.join(__dirname, 'data.txt');
const data = fs.readFileSync(file, 'utf-8').toString().split(',').map(n => +n);

// Part 1
const crabFuelMinimizer9000 = crabs => {
  const max = Math.max.apply(null, crabs);
  const fuelMap = Array.from({ length: max }, (_, p) => (
    crabs.reduce((total, crab) => total + Math.abs(crab - p), 0)
  ));

  return Math.min.apply(null, fuelMap);
}

const part1 = crabs => () => crabFuelMinimizer9000(crabs);

// Part 2
const generateCrabFuelConsumption = (source, target) => {
  const min = Math.min(source, target);
  const max = Math.max(source, target);

  return [...Array((max - min) + 1).keys()].reduce(sum);
}

const crabFuelMinimizer9001 = crabs => {
  const max = Math.max.apply(null, crabs);
  const fuelMap = Array.from({ length: max }, (_, p) => (
    crabs.reduce((total, crab) => total + generateCrabFuelConsumption(crab, p), 0)
  ));

  return Math.min.apply(null, fuelMap);
}

const part2 = crabs => () => crabFuelMinimizer9001(crabs);

module.exports = {
  exercises: [part1([...data]), part2([...data])],
  name: 'A Whale of a Tale: Crab Fuel for the Soul',
};
