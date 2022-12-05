let charValues = [];
for (i in lines) {
  let curLine = lines[i];
  let halfArrLength;
  let firstHalf;
  let secondHalf;
  console.log(curLine.length / 3);
  if (curLine.length % 2 == 0) {
    halfArrLength = curLine.length / 2;
    firstHalf = curLine.slice(0, halfArrLength);
    secondHalf = curLine.slice(halfArrLength, curLine.length);
  }
  let charsUniqueToFirstHalf = [];
  let charsUniqueToSecondHalf = [];
  for (index in firstHalf) {
    let firstHalfElem = firstHalf[index];
    if (!charsUniqueToFirstHalf.includes(firstHalfElem)) {
      charsUniqueToFirstHalf.push(firstHalfElem);
    }
    let secondHalfElem = secondHalf[index];
    if (!charsUniqueToSecondHalf.includes(secondHalfElem)) {
      charsUniqueToSecondHalf.push(secondHalfElem);
    }
  }
  // console.log(charsUniqueToFirstHalf.join(''));
  // console.log(charsUniqueToSecondHalf.join(''));
  let charsInBothHalves = [];
  for (index in charsUniqueToFirstHalf) {
    let elem = charsUniqueToFirstHalf[index];
    if (charsUniqueToSecondHalf.includes(elem)) {
      charsInBothHalves.push(elem);
    }
  }
  // console.log(charsInBothHalves);
  for (index in charsInBothHalves) {
    let charInBothHalves = charsInBothHalves[index];
    let charValue;
    if (charInBothHalves >= 'a' && charInBothHalves <= 'z') {
      charValue = charInBothHalves.charCodeAt(0) - 'a'.charCodeAt(0);
      charValue += 1;
    }
    if (charInBothHalves >= 'A' && charInBothHalves <= 'Z') {
      charValue = charInBothHalves.charCodeAt(0) - 'A'.charCodeAt(0);
      charValue += 1;
      charValue += 26;
      // console.log(charValue);
    }
    charValues.push(charValue);
  }
}
// console.log(charValues.reduce((a, b) => a + b, 0));
