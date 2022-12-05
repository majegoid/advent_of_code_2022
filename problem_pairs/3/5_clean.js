const fs = require('fs');

var lines = fs.readFileSync('input.txt', 'utf-8').split('\n');

/**
 * solve problem down here
 * 1st misunderstanding: the group line lengths are all even, which means they are cleanly divisible by 2
 * 2nd misunderstanding: slice is from [n, m) so you don't have to put m-1, you can just put m.
 */

let priorityNumbers = [];
lines.forEach((line) => {
  // get the 1st and 2nd halves of the line separately
  let len = line.length;
  let firstHalf = line.slice(0, len / 2).split('');
  let secondHalf = line.slice(len / 2, len).split('');

  // if any of the first half's characters are in the second half, keep the shared character
  let sharedChar;
  for (char of firstHalf) {
    if (secondHalf.includes(char)) {
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
