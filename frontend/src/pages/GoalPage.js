import { useState } from "react";

function GoalPage() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("Maintain Weight");
  const [activityLevel, setActivityLevel] = useState("Medium");
  const [calories, setCalories] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [message, setMessage] = useState("");

  function calculateHealthData() {
    if (!weight || !height) {
      alert("Please fill all fields");
      return;
    }

    let result = weight * 24;

    if (activityLevel === "High") {
      result += 500;
    }

    if (activityLevel === "Low") {
      result -= 200;
    }

    if (goal === "Lose Weight") {
      result -= 300;
    }

    if (goal === "Gain Muscle") {
      result += 300;
    }

    setCalories(Math.round(result));

    const bmiValue = (
      weight / ((height / 100) * (height / 100))
    ).toFixed(1);

    setBmi(bmiValue);

    localStorage.setItem("weight", weight);
    localStorage.setItem("height", height);
    localStorage.setItem("goal", goal);
    localStorage.setItem("activityLevel", activityLevel);

    setMessage("Goal saved successfully!");
  }

  function resetForm() {
    setWeight("");
    setHeight("");
    setGoal("Maintain Weight");
    setActivityLevel("Medium");
    setCalories(0);
    setBmi(0);
    setMessage("");
  }

  return (
    <div className="container">
      <h1>Nutrition Goal</h1>

      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <input
        type="number"
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />

      <select
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      >
        <option>Lose Weight</option>
        <option>Gain Muscle</option>
        <option>Maintain Weight</option>
      </select>

      <select
        value={activityLevel}
        onChange={(e) => setActivityLevel(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button onClick={calculateHealthData}>
        Save Goal
      </button>

      <button onClick={resetForm}>
        Cancel
      </button>

      <div className="results">
        <h2>Dashboard</h2>
        <p><strong>Daily Calories:</strong> {calories}</p>
        <p><strong>BMI:</strong> {bmi}</p>
        <p><strong>Goal:</strong> {goal}</p>
        <p><strong>Activity:</strong> {activityLevel}</p>
        <p>{message}</p>
      </div>

      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${Math.min((calories / 3000) * 100, 100)}%` }}
        ></div>
      </div>
    </div>
  );
}

export default GoalPage;

