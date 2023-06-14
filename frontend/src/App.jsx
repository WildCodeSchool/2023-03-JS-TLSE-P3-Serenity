import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminAuthentication from "./pages/AdminAuthentication";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Admin" element={<AdminAuthentication />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
