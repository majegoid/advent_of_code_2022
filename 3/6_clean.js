const fs = require('fs');

var lines = fs.readFileSync('input.txt', 'utf-8').split('\n');

/**
 * solve problem down here
 * 1st misunderstanding: the group line lengths are all even, which means they are cleanly divisible by 2
 * 2nd misunderstanding: slice is from [n, m) so you don't have to put m-1, you can just put m.
 */

let priorityNumbers = [];
let groupsOf3Lines = [];
let group = [];
lines.forEach((line, i) => {
  // group lines into groups of 3
  group.push(line);
  if (i % 3 == 2) {
    groupsOf3Lines.push(group);
    group = [];
  }
});
groupsOf3Lines.forEach((group) => {
  // if any of the 1st line's characters are in the 2nd and 3rd lines
  let sharedChar;
  for (char of group[0]) {
    if (group[1].includes(char) && group[2].includes(char)) {
      sharedChar = char;
      break;
    }
  }
  // calculate number from shared char
  priorityNumbers.push(
    sharedChar >= 'a' && sharedChar <= 'z'
      ? sharedChar.charCodeAt(0) - 'a'.charCodeAt(0) + 1
      : sharedChar.charCodeAt(0) - 'A'.charCodeAt(0) + 1 + 26
  );
});
const prioritySum = priorityNumbers.reduce((a, b) => a + b, 0);
console.log(prioritySum);
