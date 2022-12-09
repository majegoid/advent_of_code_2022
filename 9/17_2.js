const fs = require('fs');

var lines = fs.readFileSync('input.txt', 'utf-8').split('\n');
// var lines = fs.readFileSync('test_input.txt', 'utf-8').split('\n');

// incorrect assumption #1) I need an array of undefined bounds to be able to solve this problem
// (incorrect) I only needed an array of dynamic bounds for debugging.

// Features of this solution that are new to me:
// Working with Sets of Arrays
// Making comparison functions for elements of arrays in a set
// Making copies of arrays with the spread operator instead of assigning references to arrays

// problem #1) I was assigning a reference to the previous leading position instead
// of assigning a copy of the previous leading position
// problem #2) set.has(arr) does not work because it compares array references and not the contents
// of the array. The arrays in the set can be accessed but not directly compared to other arrays using set.has(arr).
// the set inclusion check was comparing array references and not the existence
// of an array with a certain row and column

// starts in bottom left
//'knots' with linked knots:
let knots = [
  [0, 0],
  [0, 0],
];

// const compareArrays = (a, b) =>
//   a.length === b.length && a.every((element, index) => element === b[index]);

// collect positions in a set (positions must be unique)
let visitedPositions = new Set();
// add the initial position to the set
visitedPositions.add(knots[1]);
// store the position of the leading knot before it moves
let prevLeadingPosition;
// printPath();
for (line of lines) {
  // parse direction and movementAmount
  let [direction, movementAmount] = line.trim().split(' ');
  // reset leading position to null
  prevLeadingPosition = null;
  // choose to move in a direction moveAmount times
  for (let i = 0; i < movementAmount; i++) {
    prevLeadingPosition = [...knots[0]];
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
    // console.log('');
    if (isLeadGt1Away()) {
      knots[1] = [...prevLeadingPosition];
      let visitedPositionsIncludesTailPos = doesSetContainArr(visitedPositions, knots[1]);
      if (!visitedPositionsIncludesTailPos) {
        visitedPositions.add(knots[1]);
      }
    }
    // printPath();
  }
}

// check if the leading node is more than 1 unit away from the tail node
function isLeadGt1Away() {
  // make sure knots[0] is not more than 1 char away in row or col
  let rowDistance = knots[0][0] - knots[1][0];
  let colDistance = knots[0][1] - knots[1][1];
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
