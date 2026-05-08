const express = require("express");

const router = express.Router();

const foods = require("../data/foods.json");

router.get("/", (req, res) => {
  res.json(foods);
});

module.exports = router;
