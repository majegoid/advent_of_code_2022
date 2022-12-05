const fs = require('fs');

var lines = fs.readFileSync('input.txt', 'utf-8').split('\n');

// determine overlap
//a,c,b,d
//c,a,d,b
let pairCount = 0;
// a-b,c-d
for (line of lines) {
  let val = line
    .split(',') //[a-b, c-d]
    .map((r) => r.split('-').map((s) => Number(s)))
    .flat();

  let [a, b, c, d] = val;
  if (c <= b && a <= d) pairCount += 1;
}

console.log(pairCount);
