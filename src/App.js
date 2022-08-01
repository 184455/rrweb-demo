import React from "react"
import { Routes, Route } from "react-router-dom"
import Operation from './components/operation'
import Home from './pages/Home'
import Debugger from './pages/Debugger'
import Play from './pages/Play'

export default function App() {
  return (
    <>
      <Operation />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/debugger" exact element={<Debugger />} />
        <Route path="/play/:recordId" exact element={<Play />} />
      </Routes>
    </>
  );
}
