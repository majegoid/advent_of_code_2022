const fs = require('fs');

var lines = fs.readFileSync('input.txt', 'utf-8').split('\n');
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

let playArea = [];
let rowCount = 700;
let colCount = 700;
for (let i = 0; i < rowCount; i++) {
  let row = [];
  for (let j = 0; j < colCount; j++) {
    row.push({ visitedByTail: false });
  }
  playArea.push(row);
}
// starts in bottom left
let headPosition = [Math.ceil(rowCount / 2), Math.ceil(rowCount / 2)];
let tailPosition = [Math.ceil(rowCount / 2), Math.ceil(rowCount / 2)];
let count = 0;

printPlayArea();
for (line of lines) {
  let [direction, movement] = line.split(' ');
  if (count === 0) {
    playArea[tailPosition[0]][tailPosition[1]].visitedByTail = true;
  }
  let prevPosition = null;
  switch (direction) {
    case 'R':
      for (let i = 0; i < movement; i++) {
        if (headPosition[1] === colCount - 1) {
          continue;
        }
        prevPosition = headPosition;
        headPosition = [headPosition[0], headPosition[1] + 1];
        if (isHeadMoreThan1Away()) {
          tailPosition = prevPosition;
          playArea[tailPosition[0]][tailPosition[1]].visitedByTail = true;
        }
        printPlayArea();
      }
      break;
    case 'L':
      for (let i = 0; i < movement; i++) {
        if (headPosition[1] === 0) {
          continue;
        }
        prevPosition = headPosition;
        headPosition = [headPosition[0], headPosition[1] - 1];
        if (isHeadMoreThan1Away()) {
          tailPosition = prevPosition;
          playArea[tailPosition[0]][tailPosition[1]].visitedByTail = true;
        }
        printPlayArea();
      }
      break;
    case 'D':
      for (let i = 0; i < movement; i++) {
        if (headPosition[0] === rowCount - 1) {
          continue;
        }
        prevPosition = headPosition;
        headPosition = [headPosition[0] + 1, headPosition[1]];
        if (isHeadMoreThan1Away()) {
          tailPosition = prevPosition;
          playArea[tailPosition[0]][tailPosition[1]].visitedByTail = true;
        }
        printPlayArea();
      }
      break;
    case 'U':
      for (let i = 0; i < movement; i++) {
        if (headPosition[0] === 0) {
          continue;
        }
        prevPosition = headPosition;
        headPosition = [headPosition[0] - 1, headPosition[1]];
        if (isHeadMoreThan1Away()) {
          tailPosition = prevPosition;
          playArea[tailPosition[0]][tailPosition[1]].visitedByTail = true;
        }
        printPlayArea();
      }
      break;
    default:
      throw new Error('not a direction');
  }
  printPlayArea();

  ++count;
}

function isHeadMoreThan1Away() {
  // make sure headPosition is not more than 1 char away in row or col
  let rowDistance = headPosition[0] - tailPosition[0];
  let colDistance = headPosition[1] - tailPosition[1];
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
      if (tailPosition[0] === r && tailPosition[1] === c) {
        charToPlace = 'T';
      }
      if (headPosition[0] === r && headPosition[1] === c) {
        charToPlace = 'H';
      }
      strToPrint += charToPlace;
    }
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
