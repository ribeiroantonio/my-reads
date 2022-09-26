import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./screens/Home";
import { Search } from "./screens/Search";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/search" element={<Search />}/>
      </Routes>
    </div>
  );
}

export default App;
