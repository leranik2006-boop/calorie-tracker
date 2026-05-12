import { useState } from "react";

function FoodsPage() {
  const [foods, setFoods] = useState([
    { id: 1, name: "Apple", calories: 52 },
    { id: 2, name: "Banana", calories: 89 },
  ]);

  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");

  function addFood() {
    const newFood = {
      id: Date.now(),
      name,
      calories,
    };

    setFoods([...foods, newFood]);
    setName("");
    setCalories("");
  }

  function deleteFood(id) {
    setFoods(foods.filter((food) => food.id !== id));
  }

  return (
    <div className="container">
      <h1>Foods</h1>

      <input
        type="text"
        placeholder="Food name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
      />

      <button onClick={addFood}>Add Food</button>

      <ul>
        {foods.map((food) => (
          <li key={food.id}>
            {food.name} - {food.calories} kcal
            <button onClick={() => deleteFood(food.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodsPage;
