import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MealsPage from "./pages/MealsPage";
import FoodsPage from "./pages/FoodsPage";

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav role="navigation" aria-label="Main navigation">
            <NavLink to="/" end>
            Home
          </NavLink>
            <NavLink to="/meals">
            Meals
          </NavLink>
            <NavLink to="/foods">
            Foods
          </NavLink>
        </nav>
      </header>

      <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/meals" element={<MealsPage />} />
            <Route path="/foods" element={<FoodsPage />} />
          </Routes>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: 20 }}>
        <small>Calorie Tracker — demo</small>
      </footer>
    </BrowserRouter>
  );
}

export default App;
