const colors = require('colors');
const path = require('path');
const prompt = require('prompt');

colors.enable();

const runExercise = (exercise, part) => {
  console.time('elapsed');
  const result = exercise();

  console.log(`———⤛ Part ${part + 1} ⤜———`.blue);
  console.log('result: ', result);
  console.timeEnd('elapsed');
}

(function aoc() {
  prompt.start();

  prompt.get({ name: 'day', pattern: /^\d+/ }, ( err, { day }) => {
    try {
      const duration = '———\nduration'.green.bold;
      const filePath = path.join(__dirname, `day/${day}`);
      const { exercises, name = 'Advent of Code 2021' } = require(filePath);

      console.log(name.trap, `[Day ${day}]`);

      console.time(duration);
      exercises.forEach(runExercise);
      console.timeEnd(duration);
    } catch (error) {
      console.error('Huh? Something happened!\n'.brightRed.bold, error.message);
    }
  });
})();
