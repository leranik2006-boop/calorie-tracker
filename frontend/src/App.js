import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import HomePage from "./pages/HomePage";
import GoalPage from "./pages/GoalPage";

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav role="navigation" aria-label="Main navigation">
            <NavLink to="/" end>
            Home
          </NavLink>{" "}
            
            <NavLink to="/goal">
            Goal
          </NavLink>
        </nav>
      </header>

      <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/goal" element={<GoalPage />} />
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
