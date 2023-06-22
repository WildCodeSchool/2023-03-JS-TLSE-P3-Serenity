import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import "./reset.css";
import "./App.css";
import "./styles/variable.scss";
import { StateProvider } from "./contexts/StateContext";

function App() {
  return (
    <StateProvider>
      <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/espaceadmin" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </StateProvider>
  );
}

export default App;
