const fs = require('fs');

const array = fs.readFileSync('./src/data/day2.txt').toString().split('\r\n');

// part A
/*const { x, y } = array.reduce((o, v) => {
  const [direction, velocity] = v.split(' ');

  ({
    forward: () => o.x += +velocity,
    down: () => o.y += +velocity,
    up: () => o.y -= +velocity,
  }[direction])();

  return o;
}, { x: 0, y: 0 });

const result = x * y;*/

// console.log(result);

// part B
const { x, y } = array.reduce((o, v) => {
  const [direction, velocity] = v.split(' ');

  ({
    forward: () => {
      o.x += +velocity;
      o.y += o.aim * +velocity;
    },
    down: () => o.aim += +velocity,
    up: () => o.aim -= +velocity,
  }[direction])();

  return o;
}, { aim: 0, x: 0, y: 0 });

const result = x * y;

console.log(result);