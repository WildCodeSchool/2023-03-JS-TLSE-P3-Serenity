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
        <Home />
      </div>
    </StateProvider>
  );
}

export default App;
