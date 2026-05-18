const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'foods.json');

async function readFoods() {
  const raw = await fs.readFile(DATA_PATH, 'utf8');
  return JSON.parse(raw || '[]');
}

async function writeFoods(foods) {
  await fs.writeFile(DATA_PATH, JSON.stringify(foods, null, 2), 'utf8');
}

module.exports = {
  getAll: async () => readFoods(),

  getById: async (id) => {
    const foods = await readFoods();
    return foods.find((f) => f.id === id);
  },

  add: async (food) => {
    const foods = await readFoods();
    const nextId = foods.length ? Math.max(...foods.map((f) => f.id)) + 1 : 1;
    const newFood = { id: nextId, ...food };
    foods.push(newFood);
    await writeFoods(foods);
    return newFood;
  },

  update: async (id, patch) => {
    const foods = await readFoods();
    const idx = foods.findIndex((f) => f.id === id);
    if (idx === -1) return null;
    foods[idx] = { ...foods[idx], ...patch, id };
    await writeFoods(foods);
    return foods[idx];
  },

  remove: async (id) => {
    const foods = await readFoods();
    const idx = foods.findIndex((f) => f.id === id);
    if (idx === -1) return false;
    foods.splice(idx, 1);
    await writeFoods(foods);
    return true;
  },
};
