module.exports = {
  clamp: (min, max) => value => !Number.isNaN(value) && Math.min(Math.max(+value, min), max),
  identity: (a) => a,
  sum: (a, b) => a + b,
};
