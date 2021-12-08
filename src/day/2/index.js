const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'data.txt');
const array = fs.readFileSync(file, 'utf-8').toString().split(/\r?\n/);

const part1 = () => {
  const { x, y } = array.reduce((o, v) => {
    const [direction, velocity] = v.split(' ');

    ({
      forward: () => o.x += +velocity,
      down: () => o.y += +velocity,
      up: () => o.y -= +velocity,
    }[direction])();

    return o;
  }, { x: 0, y: 0 });

  return x * y;
}

const part2 = () => {
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

  return x * y;
}

module.exports = {
  exercises: [part1, part2],
}

