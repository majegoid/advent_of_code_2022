const fs = require('fs');

var Ls = fs.readFileSync('input.txt', 'utf-8').split('\n');
let A = [];
let CC = 0;
for (L of Ls) {
  for (C of L) {
    if (A.length === 14) {
      let S = new Set();
      A.forEach((E) => S.add(E));
      if (Array.from(S).length === 14) break;
      A.shift();
    }
    CC++;
    A.push(C);
  }
  console.log(CC);
}
