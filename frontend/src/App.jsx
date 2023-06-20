import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";

import Home from "./pages/Home";
import PatientAuthentication from "./pages/PatientAuthentication";
import AdminAuthentication from "./pages/AdminAuthentication";
import "./reset.css";
import "./App.css";
import "./styles/variable.scss";
import { StateProvider } from "./contexts/StateContext";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 1 / 2,
      });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };
  return (
    <StateProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home userToken={userToken} />} />
            <Route
              path="/login"
              element={<PatientAuthentication setUser={setUser} />}
            />
            <Route
              path="/admin"
              element={<AdminAuthentication setUser={setUser} />}
            />
          </Routes>
        </div>
      </Router>
    </StateProvider>
  );
}

export default App;
