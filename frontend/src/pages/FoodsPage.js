import { useEffect, useState } from "react";

const API = "http://localhost:3000/foods";

function FoodsPage() {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [unit, setUnit] = useState("piece");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFoods();
  }, []);

  async function loadFoods() {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Failed to load foods");
      setFoods(await res.json());
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  }

  function resetForm() {
    setName("");
    setCalories("");
    setUnit("piece");
    setEditingId(null);
  }

  async function submitFood() {
    if (!name.trim()) return;
    const payload = {
      name,
      calories_per_unit: Number(calories) || 0,
      unit: unit || "piece",
    };
    try {
      let res;
      if (editingId) {
        res = await fetch(`${API}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      if (!res.ok) throw new Error("Save failed");
      await loadFoods();
      resetForm();
    } catch (e) {
      setError(e.message);
    }
  }

  function startEdit(food) {
    setEditingId(food.id);
    setName(food.name);
    setCalories(food.calories_per_unit ?? "");
    setUnit(food.unit ?? "piece");
  }

  async function deleteFood(id) {
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) throw new Error("Delete failed");
      await loadFoods();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="container">
      <h1>Foods</h1>

      {error && <div className="error">{error}</div>}

      <input
        type="text"
        placeholder="Food name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Calories per unit"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
      />
      <input
        type="text"
        placeholder="Unit (piece, 100g, ...)"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />

      <button onClick={submitFood}>
        {editingId ? "Update Food" : "Add Food"}
      </button>
      {editingId && (
        <button className="secondary" onClick={resetForm}>Cancel</button>
      )}

      <ul>
        {foods.map((food) => (
          <li key={food.id}>
            <span className="item-text">
              <strong>{food.name}</strong> — {food.calories_per_unit} kcal
              <span style={{ color: "var(--muted)", marginLeft: 8 }}>
                / {food.unit}
              </span>
            </span>
            <span className="item-actions">
              <button className="secondary" onClick={() => startEdit(food)}>Edit</button>
              <button className="danger" onClick={() => deleteFood(food.id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodsPage;
