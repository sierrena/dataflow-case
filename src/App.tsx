// App.tsx
import { Routes, Route, Link } from "react-router-dom";
import DiagramPage from "./pages/DiagramPage";
import ChartsPage from "./pages/ChartsPage";
import ManageDataPage from "./pages/ManageDataPage";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <nav className="app-nav">
          <Link to="/">Diagram</Link>
          <Link to="/charts">Charts</Link>
          <Link to="/manage">Manage Data</Link>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<DiagramPage />} />
          <Route path="/charts" element={<ChartsPage />} />
          <Route path="/manage" element={<ManageDataPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
