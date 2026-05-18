import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import GoalPage from "./pages/GoalPage";
import MealsPage from "./pages/MealsPage";
import FoodsPage from "./pages/FoodsPage";

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav role="navigation" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>{" "}
          <NavLink to="/meals">Meals</NavLink>{" "}
          <NavLink to="/foods">Foods</NavLink>{" "}
          <NavLink to="/goal">Goal</NavLink>
        </nav>
      </header>

      <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/meals" element={<MealsPage />} />
            <Route path="/foods" element={<FoodsPage />} />
            <Route path="/goal" element={<GoalPage />} />
          </Routes>
        </div>
      </main>

      <footer>
        <small>Calorie Tracker — demo</small>
      </footer>
    </BrowserRouter>
  );
}

export default App;
