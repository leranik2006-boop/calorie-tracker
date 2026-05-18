const express = require("express");
const mealDao = require("../dao/mealDao");
const foodDao = require("../dao/foodDao");

const router = express.Router();

async function buildMealFromFood(body) {
  const { foodId, quantity, date } = body;
  const qty = Number(quantity) || 1;
  const food = await foodDao.getById(Number(foodId));
  if (!food) return { error: "Invalid foodId" };
  return {
    data: {
      foodId: food.id,
      quantity: qty,
      name: `${food.name} x${qty}`,
      calories: Math.round(food.calories_per_unit * qty),
      date: date || new Date().toISOString().slice(0, 10),
    },
  };
}

router.get("/", async (req, res) => {
  try {
    res.json(await mealDao.getAll());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const meal = await mealDao.getById(Number(req.params.id));
    if (!meal) return res.status(404).json({ error: "Meal not found" });
    res.json(meal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    if (req.body.foodId !== undefined) {
      const { data, error } = await buildMealFromFood(req.body);
      if (error) return res.status(400).json({ error });
      return res.status(201).json(await mealDao.add(data));
    }
    const { name, calories, date } = req.body;
    if (!name) return res.status(400).json({ error: "name or foodId required" });
    const newMeal = await mealDao.add({
      name,
      calories: Number(calories) || 0,
      date: date || new Date().toISOString().slice(0, 10),
    });
    res.status(201).json(newMeal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let patch = req.body;
    if (req.body.foodId !== undefined) {
      const { data, error } = await buildMealFromFood(req.body);
      if (error) return res.status(400).json({ error });
      patch = data;
    }
    const updated = await mealDao.update(Number(req.params.id), patch);
    if (!updated) return res.status(404).json({ error: "Meal not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const ok = await mealDao.remove(Number(req.params.id));
    if (!ok) return res.status(404).json({ error: "Meal not found" });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
