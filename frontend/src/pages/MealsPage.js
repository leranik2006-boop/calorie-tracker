import { useEffect, useState } from "react";

const MEALS_API = "http://localhost:3000/meals";
const FOODS_API = "http://localhost:3000/foods";

function MealsPage() {
  const [meals, setMeals] = useState([]);
  const [foods, setFoods] = useState([]);
  const [foodId, setFoodId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    try {
      const [mealsRes, foodsRes] = await Promise.all([
        fetch(MEALS_API),
        fetch(FOODS_API),
      ]);
      if (!mealsRes.ok || !foodsRes.ok) throw new Error("Failed to load data");
      const foodsData = await foodsRes.json();
      setMeals(await mealsRes.json());
      setFoods(foodsData);
      if (!foodId && foodsData.length) setFoodId(String(foodsData[0].id));
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  }

  function resetForm() {
    setFoodId(foods.length ? String(foods[0].id) : "");
    setQuantity(1);
    setDate("");
    setEditingId(null);
  }

  async function submitMeal() {
    if (!foodId) {
      setError("Pick a food");
      return;
    }
    const payload = {
      foodId: Number(foodId),
      quantity: Number(quantity) || 1,
      date: date || new Date().toISOString().slice(0, 10),
    };
    try {
      const url = editingId ? `${MEALS_API}/${editingId}` : MEALS_API;
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      await loadAll();
      resetForm();
    } catch (e) {
      setError(e.message);
    }
  }

  function startEdit(meal) {
    setEditingId(meal.id);
    setFoodId(meal.foodId ? String(meal.foodId) : "");
    setQuantity(meal.quantity ?? 1);
    setDate(meal.date ?? "");
  }

  async function deleteMeal(id) {
    try {
      const res = await fetch(`${MEALS_API}/${id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) throw new Error("Delete failed");
      await loadAll();
    } catch (e) {
      setError(e.message);
    }
  }

  const totalCalories = meals.reduce((sum, m) => sum + (m.calories || 0), 0);

  return (
    <div className="container">
      <h1>Meals</h1>

      {error && <div className="error">{error}</div>}

      {foods.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>
          No foods available. Add some foods first.
        </p>
      ) : (
        <>
          <select
            value={foodId}
            onChange={(e) => setFoodId(e.target.value)}
          >
            {foods.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.calories_per_unit} kcal / {f.unit})
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button onClick={submitMeal}>
            {editingId ? "Update Meal" : "Add Meal"}
          </button>
          {editingId && (
            <button className="secondary" onClick={resetForm}>Cancel</button>
          )}
        </>
      )}

      <div className="results">
        <strong>Total today:</strong> {totalCalories} kcal ({meals.length} meals)
      </div>

      <ul>
        {meals.map((meal) => (
          <li key={meal.id}>
            <span className="item-text">
              <strong>{meal.name}</strong> — {meal.calories} kcal
              <span style={{ color: "var(--muted)", marginLeft: 8 }}>
                {meal.date}
              </span>
            </span>
            <span className="item-actions">
              <button className="secondary" onClick={() => startEdit(meal)}>Edit</button>
              <button className="danger" onClick={() => deleteMeal(meal.id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MealsPage;
