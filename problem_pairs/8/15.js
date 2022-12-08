const fs = require('fs');

// var lines = fs.readFileSync('input.txt', 'utf-8').split('\n');
var lines = fs.readFileSync('test_input.txt', 'utf-8').split('\n');

// calculate tree visibility boolean based on arrays in 4 directions
// every element of the array in any direction must be less than the height of the tree for the tree to be visible in that direction
// a tree only needs to be visible in one direction to be visible

let tree2DArr = [];
for (line of lines) {
  tree2DArr.push(line);
}

let treeDebug = (treesArr) => {
  for (line of tree2DArr) {
    console.log(line);
  }
};

let viewingDistanceArr = [];

let visibleTrees2DArray = [];
let numberOfTreesVisible = 0;
// treeRow === row
// treeCol === column
for (treeRow in lines) {
  treeRow = +treeRow;
  let line = lines[treeRow];
  visibleTrees2DArray.push([]);
  viewingDistanceArr.push([]);
  line = line.trim();
  for (treeCol in line) {
    treeCol = +treeCol;
    let northArray = [];
    let westArray = [];
    let southArray = [];
    let eastArray = [];
    if (treeRow === 0 && treeCol === 0) {
      // add number of trees visible based on outer ring
      numberOfTreesVisible += 2 * lines.length + 2 * (line.length - 2);
      // console.log(numberOfTreesVisible);
    }
    let tree = line[treeCol];
    let treeHeight = +tree;
    // determine viewing distances

    // determine if tree is not in outside (not in the first or last rows, or columns)
    if (
      treeRow !== 0 &&
      treeCol !== 0 &&
      treeRow !== tree2DArr.length - 1 &&
      treeCol !== line.length - 1
    ) {
      // determine visibility
      // get north array
      for (let row = treeRow - 1; row >= 0; row--) {
        northArray.push(lines[row][treeCol]);
      }
      // get south array
      for (let row = treeRow + 1; row <= lines.length - 1; row++) {
        southArray.push(lines[row][treeCol]);
      }
      // get west array
      for (let col = treeCol + 1; col <= line.length - 1; col++) {
        westArray.push(lines[treeRow][col]);
      }
      // get east array
      for (let col = treeCol - 1; col >= 0; col--) {
        eastArray.push(lines[treeRow][col]);
      }
      // if (treeRow === 2 && treeCol === 2) {
      //   console.log(`tree[${treeRow}, ${treeCol}]:`);
      //   console.log(`northArray: [${northArray}]`);
      //   console.log(`westArray: [${westArray}]`);
      //   console.log(`southArray: [${southArray}]`);
      //   console.log(`eastArray: [${eastArray}]`);
      // }

      let visibleFromNorth = northArray.every((t) => +t < treeHeight);
      let visibleFromSouth = southArray.every((t) => +t < treeHeight);
      let visibleFromEast = eastArray.every((t) => +t < treeHeight);
      let visibleFromWest = westArray.every((t) => +t < treeHeight);

      let currentTreeIsVisible =
        visibleFromNorth || visibleFromSouth || visibleFromEast || visibleFromWest;

      visibleTrees2DArray[treeRow].push(currentTreeIsVisible ? 'T' : 'F');
      if (currentTreeIsVisible) {
        numberOfTreesVisible += 1;
      }
    }
  }
}
// console.log(visibleTrees2DArray);
// treeDebug(visibleTrees2DArray);
console.log(`numberOfTreesVisible:`, numberOfTreesVisible);
