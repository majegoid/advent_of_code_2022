const fs = require('fs');

var lines = fs.readFileSync('input.txt', 'utf-8').split('\n');
// var lines = fs.readFileSync('test_input.txt', 'utf-8').split('\n');

//solve problem down here
//
let pairCount = 0;
let firstPartDone = false;
let curChar = 0;
// let stacks = [[], [], []];
let stacks = [[], [], [], [], [], [], [], [], []];
for (line of lines) {
  // stack parse
  let stackIndex = 0;
  if (!firstPartDone) {
    stackIndex = 0;
    for (i in line) {
      let ni = Number(i);
      let char = line[ni];
      if (char === ']') {
        // [C]
        // 0123
        // 012 (slice(2-2, 2+1))
        let crate = line.slice(ni - 2, ni + 1);
        // console.log(`Stack gets #${stackIndex + 1}: ${crate}`);
        stacks[stackIndex].push(crate);
        // console.log(stacks);
        continue;
      }
      if (i % 4 === 0 && i > 0) {
        stackIndex += 1;
      }
    }
  }
  // stack push/pop parse
  if (firstPartDone) {
    console.log(`============`);
    stacks.forEach((stack, i) => {
      console.log(i + 1, stack.join(' '));
    });
    console.log(line);
    let noWsLine = line
      .replaceAll(' ', '')
      .trim()
      .replace('move', '')
      .replace('from', ',')
      .replace('to', ',');
    let [moveAmount, fromStackIndex, toStackIndex] = noWsLine.split(',').map((s) => Number(s));
    // movement
    for (let i = moveAmount; i > 0; i--) {
      let crate = stacks[fromStackIndex - 1].pop();
      if (crate !== undefined) {
        stacks[toStackIndex - 1].push(crate);
      }
      console.log(`============`);
      stacks.forEach((stack, i) => {
        console.log(i + 1, stack.join(' '));
      });
    }
  }
  if (line === '') {
    // crates done
    stacks = stacks.map((stack) => stack.reverse());
    firstPartDone = true;
  }
}

// console.log(`============`);
// stacks.forEach((stack, i) => {
//   console.log(i+1, stack.join(' '));
// });

console.log(`TOPS============`);
console.log(
  stacks.map((stack) => stack[stack.length - 1].replaceAll('[', '').replaceAll(']', '')).join('')
);
