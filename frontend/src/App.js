import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MealsPage from "./pages/MealsPage";
import FoodsPage from "./pages/FoodsPage";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/meals">Meals</Link> |{" "}
        <Link to="/foods">Foods</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meals" element={<MealsPage />} />
        <Route path="/foods" element={<FoodsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
