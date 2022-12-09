// const elves = [];
// let elf = { foods: [] };

// rl.on('line', (line) => {
//   if (line === '') {
//     elves.push(elf);
//     elf = { foods: [] };
//   } else {
//     elf.foods.push(Number(String(line).trim()));
//   }
// });

// await events.once(rl, 'close').then(() => {
//   elves.push(elf);

/** Problem 2 */
const findCalorieSumOfTop3CalorieHoldingElves = (elves) => {
  let sumOfTop3 = elves
    .map((elf) =>
      elf.foods.reduce((foodCalorieSum, nextFoodCalories) => foodCalorieSum + nextFoodCalories, 0)
    )
    .sort((prevFoodCalorieSum, nextFoodCalorieSum) => nextFoodCalorieSum - prevFoodCalorieSum)
    .slice(0, 3)
    .reduce(
      (curTop3FoodCalorieSum, nextFoodCalorieSum) => curTop3FoodCalorieSum + nextFoodCalorieSum
    );
  console.log(`top3CalorieHoldingElves' total foodTotalCalories:`, sumOfTop3);
};

/** Problem 2 better solution */
const altProblem2 = (elves) => {
  let sumOfTop3 = elves
    .map((elf) => elf.foods.reduce((a, b) => a + b))
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b);
  console.log(`top3CalorieHoldingElves' total foodTotalCalories:`, sumOfTop3);
};
