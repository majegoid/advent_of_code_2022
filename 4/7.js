const fs = require('fs');

var lines = fs.readFileSync('input.txt', 'utf-8').split('\n');

//solve problem down here
let lineCount = 0;
let pairCount = 0;
for (line of lines) {
  // console.log(line);
  lineCount += 1;
  let ranges = line.split(',');
  let [a, b] = ranges[0].split('-').map((n) => Number(n));
  let [c, d] = ranges[1].split('-').map((n) => Number(n));

  // case where c,d contains a,b
  // c,a,b,d
  if (c <= a && b <= d) {
    // console.log(`#[${c,a,b,d} ${line}]: ${c} <= ${a} && ${b} <= ${d} === ${c <= a && b <= d}`);
    console.log('#1', c, a, b, d, c <= a && b <= d);
    pairCount += 1;
    continue;
  }
  //case where a,b contains c,d
  // a,c,d,b
  if (a <= c && d <= b) {
    // console.log(`#[${a,c,d,b} ${line}]: ${a} <= ${c} && ${d} <= ${b} === ${a <= c && d <= b}`);
    console.log('#2', a, c, d, b, a <= c && d <= b);
    pairCount += 1;
    continue;
  }
}

console.log(pairCount);
