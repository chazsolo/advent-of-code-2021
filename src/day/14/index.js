const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'data.txt');
const data = fs.readFileSync(file, 'utf-8').split(/\r?\n/).slice(0, -1);

const [template, _, ...rules] = data;
const ruleMap = new Map(rules.map(rule => rule.split(' -> ')));

const countPolymer = polymer => polymer.reduce((o, c) => ({
  ...o,
  [c]: c in o ? o[c] + 1 : 1,
}), {});

const part1 = (steps) => {
  let polymer = [...template];
  let polymerInStep = [...polymer];

  for (let s = 0; s < steps; s++) {
    // iterate backwards to reduce burden on index tracking
    for (let i = polymer.length - 2; i >= 0; i--) {
      const pair = polymer.slice(i, i + 2);
      const char = ruleMap.get(pair.join(''));

      char && polymerInStep.splice(i + 1, 0, char);
    }

    polymer = [...polymerInStep];
  }

  const counts = Object.values(countPolymer(polymer));
  const [min, max] = [Math.min(...counts), Math.max(...counts)];

  return max - min;
}

const result = part1(10);
console.log('p1', result);

const part2 = () => {

}
