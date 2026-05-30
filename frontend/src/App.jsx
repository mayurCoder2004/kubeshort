import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">

        <nav className="bg-black text-white p-4 flex gap-6">
          <Link to="/">Home</Link>

          <Link to="/analytics">
            Analytics
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/analytics"
            element={<Analytics />}
          />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;