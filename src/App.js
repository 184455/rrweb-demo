import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Record from './pages/Record'
import Play from './pages/Play'

export default function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/record" exact element={<Record />} />
      <Route path="/play" exact element={<Play />} />
    </Routes>
  );
}
