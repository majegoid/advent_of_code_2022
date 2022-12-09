const fs = require('fs');

// var lines = fs.readFileSync('input.txt', 'utf-8').split('\n');
var lines = fs.readFileSync('test_input.txt', 'utf-8').split('\n');

let knots = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];

let visitedPositions = new Set();
visitedPositions.add(knots[1]);

let p0;
let p1;

// printPath();
for (line of lines) {
  let [direction, movementAmount] = line.trim().split(' ');
  for (let i = 0; i < movementAmount; i++) {
    for (let k = 0; k < knots.length - 1; k++) {
      p0 = [...knots[k]];
      if (k === 0) {
        moveHead(direction, knots);
      } else {
        if (isLeadGt1Away(knots[k], knots[k + 1])) {
          knots[k] = [...p1];
          trackVisitedPositions(k);
        }
      }
      p1 = [...knots[k + 1]];
      if (isLeadGt1Away(knots[k], knots[k + 1])) {
        knots[k + 1] = [...p0];
        trackVisitedPositions(k);
      }
    }
  }
}

function trackVisitedPositions(k) {
  let positionHasBeenVisited = doesSetContainArr(visitedPositions, knots[k]);
  if (!positionHasBeenVisited) {
    visitedPositions.add(knots[k]);
  }
}

// check if the leading knot is more than 1 unit away from the next knot
function isLeadGt1Away(leadKnot, tailKnot) {
  let rowDistance = leadKnot[0] - tailKnot[0];
  let colDistance = leadKnot[1] - tailKnot[1];
  if (Math.abs(rowDistance) > 1 || Math.abs(colDistance) > 1) {
    return true;
  }
}

// count the locations visited by any tail
let visitedPositionCount = Array.from(visitedPositions).length;
console.log('visitedPositionCount', visitedPositionCount);

function doesSetContainArr(set, arrToCheck) {
  let arrFromSet = Array.from(set);
  for (let positionArr of arrFromSet) {
    if (positionArr[0] === arrToCheck[0] && positionArr[1] === arrToCheck[1]) {
      return true;
    }
  }
  return false;
}

function printPath() {
  // determine size
  let vPArr = Array.from(visitedPositions);
  let vPArrRows = vPArr.map((position) => position[0]);
  let vPArrCols = vPArr.map((position) => position[1]);

  let minRowIndex = vPArrRows.reduce((min, cur) => Math.min(min, cur), 0);
  let maxRowIndex = vPArrRows.reduce((max, cur) => Math.max(max, cur), 0);
  let minColIndex = vPArrCols.reduce((min, cur) => Math.min(min, cur), 0);
  let maxColIndex = vPArrCols.reduce((max, cur) => Math.max(max, cur), 0);

  for (let r = minRowIndex; r <= maxRowIndex; r++) {
    let lineOfChars = '';
    let charToPlace = '.';
    for (let c = minColIndex; c <= maxColIndex; c++) {
      // make a check for a position that has the same elements
      // array comparison is not possible because they are different objects
      let isCurPositionVisited = doesSetContainArr(visitedPositions, [r, c]);
      if (isCurPositionVisited) {
        charToPlace = '#';
      }
      if (knots[1][0] === r && knots[1][1] === c) {
        charToPlace = 'T';
      }
      if (knots[0][0] === r && knots[0][1] === c) {
        charToPlace = 'H';
      }
      lineOfChars += charToPlace;
    }
    console.log(lineOfChars);
  }
  console.log('');
}

function moveHead(direction, knots) {
  switch (direction) {
    case 'R':
      knots[0][1] += 1;
      break;
    case 'L':
      knots[0][1] -= 1;
      break;
    case 'D':
      knots[0][0] += 1;
      break;
    case 'U':
      knots[0][0] -= 1;
      break;
    default:
      throw new Error('not a direction');
  }
}
