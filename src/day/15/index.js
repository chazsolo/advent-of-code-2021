const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'data.example.txt');
const data = fs.readFileSync(file, 'utf-8').split(/\r?\n/).slice(0, -1);

console.log('data', data);
