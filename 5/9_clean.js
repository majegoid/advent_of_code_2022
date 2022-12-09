const fs = require('fs');

var lines = fs.readFileSync('input.txt', 'utf-8').split('\n');
// var lines = fs.readFileSync('test_input.txt', 'utf-8').split('\n');

//solve problem down here
//parse crates from stacks, and stack operations, and then pop & push crates from different stacks one at a time
// let stacks = [[], [], []];
let stacks = [[], [], [], [], [], [], [], [], []];
let firstPartDone = false;
for (line of lines) {
  // stack parse
  let stackIndex = 0;
  if (!firstPartDone) {
    for (i in line) {
      let ni = Number(i);
      let char = line[ni];
      if (char === ']') {
        let crate = line.slice(ni - 2, ni + 1);
        stacks[stackIndex].push(crate);
        continue;
      }
      if (i % 4 === 0 && i > 0) {
        stackIndex += 1;
      }
    }
  }
  // stack push/pop parse
  if (firstPartDone) {
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
    }
  }
  if (line === '') {
    // crates done
    stacks = stacks.map((stack) => stack.reverse());
    firstPartDone = true;
  }
}

console.log(`TOPS============`);
console.log(
  stacks.map((stack) => stack[stack.length - 1].replaceAll('[', '').replaceAll(']', '')).join('')
);
