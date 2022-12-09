const fs = require('fs');

// main problem: solution takes years to solve (over 30 seconds per run)
let playArea = [];

let rowCount = 700;
let colCount = 700;
var lines = fs.readFileSync('input.txt', 'utf-8').split('\n');

// let rowCount = 20;
// let colCount = 20;
// var lines = fs.readFileSync('test_input.txt', 'utf-8').split('\n');

//4489 @ 100x100 (in bottom left corner)
//5862 @ 200x200 (in bottom left corner)
//6084 @ 300x300 (in bottom left corner)
//6122 @ 400x400 (in bottom left corner)
//6122 @ 500x500 (in bottom left corner)
//6122 @ 600x600 (in bottom left corner) [too low]

// @ 100x100 (near the middle)
// @ 200x200 (near the middle)
// @ 300x300 (near the middle)
// @ 400x400 (near the middle)
//6074 @ 500x500 (near the middle) [too low]
//6180 @ 600x600 (near the middle) [too high]
//6175 @ 700x700 (near the middle) []

// simulate 10 knot rope

for (let i = 0; i < rowCount; i++) {
  let row = [];
  for (let j = 0; j < colCount; j++) {
    row.push({ visitedByTail: false });
  }
  playArea.push(row);
}
// starts in bottom left
let count = 0;

let knots = [];
for (let i = 1; i < 10; i++) {
  knots.push([Math.ceil(rowCount / 2), Math.ceil(rowCount / 2)]);
}

// printPlayArea();
for (line of lines) {
  let [direction, movement] = line.split(' ');
  if (count === 0) {
    playArea[knots[1][0]][knots[1][1]].visitedByTail = true;
  }
  let prevPosition = null;
  switch (direction) {
    case 'R':
      for (let i = 0; i < movement; i++) {
        if (knots[0][1] === colCount - 1) {
          continue;
        }
        prevPosition = knots[0];
        knots[0] = [knots[0][0], knots[0][1] + 1];
        moveTail(prevPosition);
        // printPlayArea();
      }
      break;
    case 'L':
      for (let i = 0; i < movement; i++) {
        if (knots[0][1] === 0) {
          continue;
        }
        prevPosition = knots[0];
        knots[0] = [knots[0][0], knots[0][1] - 1];
        moveTail(prevPosition);
        // printPlayArea();
      }
      break;
    case 'D':
      for (let i = 0; i < movement; i++) {
        if (knots[0][0] === rowCount - 1) {
          continue;
        }
        prevPosition = knots[0];
        knots[0] = [knots[0][0] + 1, knots[0][1]];
        moveTail(prevPosition);
        // printPlayArea();
      }
      break;
    case 'U':
      for (let i = 0; i < movement; i++) {
        if (knots[0][0] === 0) {
          continue;
        }
        prevPosition = knots[0];
        knots[0] = [knots[0][0] - 1, knots[0][1]];
        moveTail(prevPosition);
        // printPlayArea();
      }
      break;
    default:
      throw new Error('not a direction');
  }
  // printPlayArea();

  ++count;
}

function moveTail(prevHeadPosition) {
  let prevPosition = prevHeadPosition;
  for (let j = 1; j < knots.length; j++) {
    if (isLeadingKnotMoreThan1Away(knots[j - 1], knots[j])) {
      knots[j] = prevPosition;
      playArea[knots[j][0]][knots[j][1]].visitedByTail = true;
    }
  }
}

function hasBeenVisitedByTail() {}

function isLeadingKnotMoreThan1Away(leadingPos, followingPos) {
  // make sure knots[0] is not more than 1 char away in row or col
  let rowDistance = leadingPos[0] - followingPos[0];
  let colDistance = leadingPos[1] - followingPos[1];
  if (Math.abs(rowDistance) > 1 || Math.abs(colDistance) > 1) {
    return true;
  }
}

function printPlayArea() {
  for (let r = 0; r < playArea.length; r++) {
    let line = playArea[r];
    let strToPrint = '';
    for (let c = 0; c < line.length; c++) {
      let position = playArea[r][c];
      let charToPlace = '.';
      if (position.visitedByTail === true) {
        charToPlace = '#';
      }
      if (knots[1][0] === r && knots[1][1] === c) {
        charToPlace = 'T';
      }
      if (knots[0][0] === r && knots[0][1] === c) {
        charToPlace = 'H';
      }
      strToPrint += charToPlace;
    }
    // console.log(strToPrint);
  }
}

// for (line of playArea) {
//   line.reduce();
// }
let sum = playArea
  .map((line) => {
    let lineValues = line.map((o) => {
      return o.visitedByTail ? 1 : 0;
    });
    let lineSum = lineValues.reduce((a, b) => a + b, 0);
    return lineSum;
  })
  .reduce((a, b) => a + b, 0);

console.log(sum);
