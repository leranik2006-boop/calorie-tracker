const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'meals.json');

async function readMeals() {
  const raw = await fs.readFile(DATA_PATH, 'utf8');
  return JSON.parse(raw || '[]');
}

async function writeMeals(meals) {
  await fs.writeFile(DATA_PATH, JSON.stringify(meals, null, 2), 'utf8');
}

module.exports = {
  getAll: async () => readMeals(),
  add: async (meal) => {
    const meals = await readMeals();
    const nextId = meals.length ? Math.max(...meals.map(m => m.id)) + 1 : 1;
    const newMeal = { id: nextId, ...meal };
    meals.push(newMeal);
    await writeMeals(meals);
    return newMeal;
  },
};
