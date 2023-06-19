import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PatientAuthentication from "./pages/PatientAuthentication";
import AdminAuthentication from "./pages/AdminAuthentication";
import "./reset.css";
import "./App.css";
import "./styles/variable.scss";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<PatientAuthentication />} />
          <Route path="/admin" element={<AdminAuthentication />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
