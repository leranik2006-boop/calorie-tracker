import { useState, useEffect } from "react";

function GoalPage() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("Maintain Weight");
  const [activityLevel, setActivityLevel] = useState("Medium");
  const [calories, setCalories] = useState("");

  function calculateCalories() {
    // Basic validation: weight and height must be positive numbers (if provided)
    const w = Number(weight);
    const h = Number(height);

    if (weight !== "" && (!Number.isFinite(w) || w <= 0)) {
      alert("Please enter a valid positive weight");
      return;
    }

    if (height !== "" && (!Number.isFinite(h) || h <= 0)) {
      alert("Please enter a valid positive height");
      return;
    }

    let result = 2200;

    if (goal === "Lose Weight") {
      result = 1800;
    }

    if (goal === "Gain Muscle") {
      result = 2800;
    }

    setCalories(result);

    // persist to localStorage
    try {
      const data = { weight, height, goal, activityLevel, calories: result };
      localStorage.setItem("calorieTracker:goal", JSON.stringify(data));
    } catch (e) {
      console.warn("Failed to save goal to localStorage", e);
    }
  }

  function resetForm() {
    setWeight("");
    setHeight("");
    setGoal("Maintain Weight");
    setActivityLevel("Medium");
    setCalories("");
    try {
      localStorage.removeItem("calorieTracker:goal");
    } catch (e) {
      console.warn("Failed to clear localStorage", e);
    }
  }

  useEffect(() => {
    // load from localStorage if present
    try {
      const raw = localStorage.getItem("calorieTracker:goal");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed) {
          setWeight(parsed.weight ?? "");
          setHeight(parsed.height ?? "");
          setGoal(parsed.goal ?? "Maintain Weight");
          setActivityLevel(parsed.activityLevel ?? "Medium");
          setCalories(parsed.calories ?? "");
        }
      }
    } catch (e) {
      console.warn("Failed to load goal from localStorage", e);
    }
  }, []);

  return (
    <div>
      <h1>Nutrition Goal</h1>

      <input
        type="number"
        placeholder="Weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Height"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />

      <br /><br />

      <select
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      >
        <option>Lose Weight</option>
        <option>Gain Muscle</option>
        <option>Maintain Weight</option>
      </select>

      <br /><br />

      <select
        value={activityLevel}
        onChange={(e) => setActivityLevel(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <br /><br />

      <button onClick={calculateCalories}>
        Save
      </button>

      <button onClick={resetForm}>
        Cancel
      </button>

      <h2>
        Daily Calories: {calories}
      </h2>
    </div>
  );
}

export default GoalPage;
