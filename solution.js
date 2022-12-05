const events = require('events');
const fs = require('fs');
const readline = require('readline');

const problem_number = 3;
(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      // input: fs.createReadStream(`problem_${problem_number}_input.txt`),
      input: fs.createReadStream(`problem_${problem_number}_test_input.txt`),
      crlfDelay: Infinity,
    });

    let lines = [];
    rl.on('line', (line) => lines.push(line));

    await events.once(rl, 'close').then(() => {
      //split the line in half
      //compare the halves
      //collect characters that are in both sides
      // const priorities =
    });
  } catch (err) {
    console.error(err);
  }
})();

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
