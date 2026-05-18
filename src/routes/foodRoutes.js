const express = require("express");
const foodDao = require("../dao/foodDao");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const foods = await foodDao.getAll();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const food = await foodDao.getById(Number(req.params.id));
    if (!food) return res.status(404).json({ error: "Food not found" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, calories_per_unit, unit } = req.body;
    if (!name) return res.status(400).json({ error: "name is required" });
    const newFood = await foodDao.add({
      name,
      calories_per_unit: Number(calories_per_unit) || 0,
      unit: unit || "piece",
    });
    res.status(201).json(newFood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await foodDao.update(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ error: "Food not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const ok = await foodDao.remove(Number(req.params.id));
    if (!ok) return res.status(404).json({ error: "Food not found" });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
