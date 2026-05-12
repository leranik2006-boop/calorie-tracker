import { useEffect, useState } from "react";

function HomePage() {
  const [mealsStatus, setMealsStatus] = useState(null);
  const [foodsStatus, setFoodsStatus] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/meals")
      .then((r) => (r.ok ? setMealsStatus("ok") : setMealsStatus("error")))
      .catch(() => setMealsStatus("error"));

    fetch("http://localhost:3000/foods")
      .then((r) => (r.ok ? setFoodsStatus("ok") : setFoodsStatus("error")))
      .catch(() => setFoodsStatus("error"));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Calorie Tracker</h1>

      <p>
        Simple app to track meals and foods. Use the navigation to view or add
        meals and foods.
      </p>

      <div style={{ marginTop: 12 }}>
        <strong>Backend status:</strong>
        <ul>
          <li>Meals API: {mealsStatus ?? "checking..."}</li>
          <li>Foods API: {foodsStatus ?? "checking..."}</li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
