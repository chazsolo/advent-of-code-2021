const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'data.txt');
const array = fs.readFileSync(file, 'utf-8').toString().split(/\r?\n/);

const part1 = () => {
  const totals = array.reduce((t, binStr) => {
    [...binStr].forEach((c, i) => {
      t[i] += +c;
    });

    return t;
  }, new Array(array[0].length).fill(0));

  const gammaRateStr = totals.map((t) => +(t > (array.length / 2)));
  const gammaRate = parseInt(gammaRateStr.join(''), 2);

  const epsilonRateStr = totals.map((t) => +(t < (array.length / 2)));
  const epsilonRate = parseInt(epsilonRateStr.join(''), 2);

  return gammaRate * epsilonRate;
}

const part2 = () => {
  const binLength = array[0].length;
  const sumColumn = (array, index) => array.reduce(([_1, _0], value) => ([
    _1 += +(value[index] === '1'),
    _0 += +(value[index] === '0'),
  ]), [0, 0]);

  let oxyRatings = [...array];

  for (let i = 0; i < binLength; i++) {
    if (oxyRatings.length === 1) break;

    const [_1, _0] = sumColumn(oxyRatings, i);
    const filterDigit = _1 >= _0 ? '1' : '0';
    oxyRatings = oxyRatings.filter(rating => rating[i] === filterDigit);
  }

  const oxyRating = parseInt(oxyRatings[0], 2);

  let co2Ratings = [...array];

  for (let i = 0; i < binLength; i++) {
    if (co2Ratings.length === 1) break;

    const [_1, _0] = sumColumn(co2Ratings, i);
    const filterDigit = _0 <= _1 ? '0' : '1';
    co2Ratings = co2Ratings.filter(rating => rating[i] === filterDigit);
  }

  const co2Rating = parseInt(co2Ratings[0], 2);

  return oxyRating * co2Rating;
}

module.exports = {
  exercises: [part1, part2],
};
