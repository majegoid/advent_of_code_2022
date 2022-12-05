let score = 0;
lines.forEach((line) => {
  let match = line.split(' ');
  /**
   * A X = 3
   * B Y = 3
   * C Z = 3
   *
   * A Y = 6
   * B Z = 6
   * C X = 6
   *
   * A Z = 0
   * B X = 0
   * C Y = 0
   */
  switch (match[0]) {
    case 'A':
      if (match[1] === 'X') {
        score += 3;
        score += 0;
      }
      if (match[1] === 'Y') {
        score += 1;
        score += 3;
      }
      if (match[1] === 'Z') {
        score += 2;
        score += 6;
      }
      break;
    case 'B':
      if (match[1] === 'X') {
        score += 1;
        score += 0;
      }
      if (match[1] === 'Y') {
        score += 2;
        score += 3;
      }
      if (match[1] === 'Z') {
        score += 3;
        score += 6;
      }
      break;
    case 'C':
      if (match[1] === 'X') {
        score += 2;
        score += 0;
      }
      if (match[1] === 'Y') {
        score += 3;
        score += 3;
      }
      if (match[1] === 'Z') {
        score += 1;
        score += 6;
      }
      break;
  }
});
console.log(score);
//#1
// findMaxCalorieHoldingElf(elves);
// altProblem1(elves);
// //#2
// findCalorieSumOfTop3CalorieHoldingElves(elves);
// altProblem2(elves);
