const fs = require('fs');

const data = fs.readFileSync('./src/data/day1.txt').toString().split('\r\n');

const incReduce = (increments, value, index, array) => {
    increments += value < array[index + 1] ? 1 : 0;
    return increments;
}

const inc = data.reduce(incReduce, 0);

const inc2 = data.map((v, i) => {
    if (data[i] && data[i + 1] && data[i + 2]) {
        return data[i] + data[i + 1] + data[i + 2]
    }
}).filter(Boolean).reduce(incReduce, 0);

console.log(inc2);
// console.log(a.length);
// console.log(inc2.length);