import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./Components/Pages/Dashboard";
import { AddWord } from "./Components/Pages/AddWord";
import { GetToKnow } from "./Components/Pages/GetToKnow";
import { Exam } from "./Components/Pages/Exam";
import "./App.css";
import { Settings } from "./Components/Pages/Settings";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-word" element={<AddWord />} />
          <Route path="/get-to-know" element={<GetToKnow />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
