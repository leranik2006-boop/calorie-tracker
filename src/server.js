const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Calorie Tracker API works!" });
});

// Mount routes
const mealRoutes = require("./routes/mealRoutes");
const foodRoutes = require("./routes/foodRoutes");

app.use('/api/meals', mealRoutes);
app.use('/api/foods', foodRoutes);

app.use("/meals", mealRoutes);
app.use("/foods", foodRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


