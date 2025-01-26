import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import DiagramPage from "./pages/DiagramPage";
import ChartsPage from "./pages/ChartsPage";

function App() {
  return (
    <div>
      <nav style={{ margin: "1rem 0" }}>
        <Link to="/">Diagram</Link> | <Link to="/charts">Charts</Link>
      </nav>

      <Routes>
        <Route path="/" element={<DiagramPage />} />
        <Route path="/charts" element={<ChartsPage />} />
      </Routes>
    </div>
  );
}

export default App;
