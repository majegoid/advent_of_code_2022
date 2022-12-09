const fs = require('fs');

var lines = fs.readFileSync('input.txt', 'utf-8').split('\n');
// var lines = fs.readFileSync('test_input.txt', 'utf-8').split('\n');

//solve problem down here
let stack = [];
let charCount = 0;
let found4Uniq = false;
for (line of lines) {
  for (char of line) {
    if (stack.length === 14) {
      // none of the elements are equal to each other
      let mySet = new Set();
      for (let i = 0; i < stack.length; i++) {
        mySet.add(stack[i]);
      }
      let setLength = Array.from(mySet.entries()).length;
      if (setLength === 14) {
        found4Uniq = true;
        break;
      }
      stack.shift();
    }
    charCount += 1;
    stack.push(char);
  }

  if (found4Uniq) {
    // console.log(`line chars: ${line.length}`);
    console.log(charCount);
    stack = [];
    charCount = 0;
    found4Uniq = false;
    continue;
  }
}
