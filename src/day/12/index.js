const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'data.example.txt');
const data = fs.readFileSync(file, 'utf-8').split(/\r?\n/).slice(0, -1);
const links = data.map(entry => entry.split('-'));

const uniqueNodes = [...new Set(links.flat())];

console.log('links', links);
console.log('uniqueNodes', uniqueNodes);

const nodeLinkMap = links.reduce((nlm, [source, target]) => ({
  ...nlm,
  [source]: nlm[source] ? [...nlm[source], target] : [target],
}), {})

console.log('nodeLinkMap', nodeLinkMap);
