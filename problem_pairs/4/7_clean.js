const fs = require('fs');

var lines = fs.readFileSync('input.txt', 'utf-8').split('\n');

//solve problem down here
// does the range [a,b], or [c,d], contain the other?
let pairCount = 0;
for (line of lines) {
  let [a, b, c, d] = line
    .split(',')
    .map((range) => range.split('-').map((n) => Number(n)))
    .flat();
  // c,a,b,d:  c,d contains a,b
  if (c <= a && b <= d) {
    pairCount += 1;
    continue;
  }
  // a,c,d,b: a,b contains c,d
  if (a <= c && d <= b) {
    pairCount += 1;
    continue;
  }
}

console.log(pairCount);
