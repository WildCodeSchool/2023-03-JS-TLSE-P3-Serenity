import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import PatientAuthentication from "./pages/PatientAuthentication";
import AdminAuthentication from "./pages/AdminAuthentication";
import "./reset.css";
import "./App.css";
import "./styles/variable.scss";
import { StateProvider } from "./contexts/StateContext";
import { AuthFunctionProvider } from "./contexts/AuthFunctionContext";

function App() {
  return (
    <StateProvider>
      <AuthFunctionProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<PatientAuthentication />} />
              <Route path="/admin" element={<AdminAuthentication />} />
            </Routes>
          </div>
        </Router>
      </AuthFunctionProvider>
    </StateProvider>
  );
}

export default App;
