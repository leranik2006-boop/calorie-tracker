const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/goal", (req, res) => {
  const {
    weight,
    height,
    goal,
    activityLevel
  } = req.body;

  let calories = weight * 24;

  if (activityLevel === "High") {
    calories += 500;
  }

  if (activityLevel === "Low") {
    calories -= 200;
  }

  if (goal === "Lose Weight") {
    calories -= 300;
  }

  if (goal === "Gain Muscle") {
    calories += 300;
  }

  const bmi =
    weight / ((height / 100) * (height / 100));

  res.json({
    dailyCalories: Math.round(calories),
    bmi: bmi.toFixed(1)
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
