import { useState } from "react";

function MealsPage() {
  const [meals, setMeals] = useState([
    { id: 1, name: "Breakfast" },
    { id: 2, name: "Lunch" },
    { id: 3, name: "Dinner" }
  ]);

  const [name, setName] = useState("");

  function addMeal() {
    const newMeal = {
      id: Date.now(),
      name,
    };

    setMeals([...meals, newMeal]);
    setName("");
  }

  function deleteMeal(id) {
    setMeals(meals.filter((meal) => meal.id !== id));
  }

  return (
    <div className="container">
      <h1>Meals</h1>

      <input
        type="text"
        placeholder="Meal name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={addMeal}>Add Meal</button>

      <ul>
        {meals.map((meal) => (
          <li key={meal.id}>
            {meal.name}

            <button onClick={() => deleteMeal(meal.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MealsPage;
