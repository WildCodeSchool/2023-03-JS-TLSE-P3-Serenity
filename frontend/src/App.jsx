import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PatientAuthentication from "./pages/PatientAuthentication";
import AdminAuthentication from "./pages/AdminAuthentication";
import "./reset.css";
import "./App.css";
import "./styles/variable.scss";
import { StateProvider } from "./contexts/StateContext";
import { AuthFunctionProvider } from "./contexts/AuthFunctionContext";
import EspaceAdmin from "./pages/EspaceAdmin";

function App() {
  return (
    <StateProvider>
      <AuthFunctionProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/admin" element={<AdminAuthentication />} />
              <Route path="/login" element={<PatientAuthentication />} />
              <Route path="/espaceadmin" element={<EspaceAdmin />} />
            </Routes>
          </div>
        </Router>
      </AuthFunctionProvider>
    </StateProvider>
  );
}

export default App;
