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


/** Problem 1 */
const findMaxCalorieHoldingElf = (elves) => {
  let maximumCalories = 0;
  elves.forEach((elf) => {
    let elfFoodTotalCalories = elf.foods.reduce((a, b) => a + b);
    if (elfFoodTotalCalories > maximumCalories) {
      maximumCalories = elfFoodTotalCalories;
    }
  });
  console.log('maxCalorieHoldingElf total foodTotalCalories:', maximumCalories);
};

/** Problem 1 better solution */
const altProblem1 = (elves) => {
  let maxFoodCalorieSum = elves
    .map((elf) => elf.foods)
    //((((curFoodCaloriesSum + next) + next) + next) + next) + next...
    .reduce((curFoodCaloriesSum, nextFood) => curFoodCaloriesSum + nextFood)
    //Math.max(Math.max(Math.max(Math.max(curMaxFoodCaloriesSum, next), next), next), next)...
    .reduce((curMaxFoodCaloriesSum, next) => Math.max(curMaxFoodCaloriesSum, next), 0);
  console.log("maxCalorieHoldingElf's total food calories:", maxFoodCalorieSum);
};