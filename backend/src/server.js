const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Simple in-memory sample data
let foods = [
  { id: 1, name: 'Apple', calories: 95 },
  { id: 2, name: 'Banana', calories: 105 }
];

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get('/foods', (req, res) => {
  res.json(foods);
});

app.post('/foods', (req, res) => {
  const { name, calories } = req.body;
  const id = foods.length ? foods[foods.length - 1].id + 1 : 1;
  const item = { id, name, calories };
  foods.push(item);
  res.status(201).json(item);
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
