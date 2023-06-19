import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PatientAuthentication from "./pages/PatientAuthentication";
import AdminAuthentication from "./pages/AdminAuthentication";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<PatientAuthentication />} />
          <Route path="/admin" element={<AdminAuthentication />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
