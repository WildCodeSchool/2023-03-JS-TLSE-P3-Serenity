import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./reset.css";
import "./App.css";
import "./styles/variable.scss";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/espaceadmin" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
