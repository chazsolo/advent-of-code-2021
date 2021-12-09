module.exports = {
  clamp: (min, max) => value => !Number.isNaN(value) && Math.min(Math.max(+value, min), max),
  identity: (a) => a,
  mult: (a, b) => a * b,
  sum: (a, b) => a + b,
};
