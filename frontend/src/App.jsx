import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PatientAuthentication from "./pages/PatientAuthentication";
import AdminAuthentication from "./pages/AdminAuthentication";
import PracticianAuthentication from "./pages/PracticianAuthentication";
import "./reset.css";
import "./App.css";
import "./styles/variable.scss";
import { StateProvider } from "./contexts/StateContext";
import { AuthFunctionProvider } from "./contexts/AuthFunctionContext";
import EspaceAdmin from "./pages/EspaceAdmin";
import EspacePro from "./pages/EspacePro";
import EspacePatient from "./pages/EspacePatient";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <StateProvider>
      <AuthFunctionProvider>
        <Router>
          <div className="app backgroud-dark">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<AdminAuthentication />} />
              <Route path="/login" element={<PatientAuthentication />} />
              <Route path="/loginpro" element={<PracticianAuthentication />} />
              <Route path="/espaceadmin" element={<EspaceAdmin />} />
              <Route path="/espacepro" element={<EspacePro />} />
              <Route path="/espacepatient" element={<EspacePatient />} />
            </Routes>
          </div>
        </Router>
      </AuthFunctionProvider>
    </StateProvider>
  );
}

export default App;
