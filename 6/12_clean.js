const fs = require('fs');

var lines = fs.readFileSync('input.txt', 'utf-8').split('\n');
// var lines = fs.readFileSync('test_input.txt', 'utf-8').split('\n');

//solve problem down here
// The problem is to find the first 4 unique characters in the line
// My problem was I didn't know how to use Set() or any other way to get unique characters only from
// an array
let arr = [];
let charCount = 0;
for (line of lines) {
  for (char of line) {
    if (arr.length === 14) {
      let set = new Set();
      arr.forEach((elem) => set.add(elem));
      if (Array.from(set).length === 14) break;
      arr.shift();
    }
    charCount++;
    arr.push(char);
  }
  console.log(charCount);
  arr = [];
  charCount = 0;
}
