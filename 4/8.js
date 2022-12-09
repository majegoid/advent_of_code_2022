const fs = require('fs');

var lines = fs.readFileSync('input.txt', 'utf-8').split('\n');

// determine overlap
//a,c,b,d
//c,a,d,b
let pairCount = 0;
for (line of lines) {
  let ranges = line.split(',');
  let [a, b] = ranges[0].split('-').map((n) => Number(n));
  let [c, d] = ranges[1].split('-').map((n) => Number(n));
  if (c <= b && a <= d) {
    pairCount += 1;
    continue;
  }
}

console.log(pairCount);
