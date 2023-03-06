import React from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./Components/Pages/Dashboard";
import { AddWord } from "./Components/Pages/AddWord";
import { GetToKnow } from "./Components/Pages/GetToKnow";
import { Exam } from "./Components/Pages/Exam";
import "./App.css";
import { Settings } from "./Components/Pages/Settings";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-word" element={<AddWord title="Add Word" />} />
        <Route
          path="/get-to-know"
          element={<GetToKnow title="Get To Know" />}
        />
        <Route path="/exam" element={<Exam title="Take an Exam" />} />
        <Route path="/settings" element={<Settings title="Settings" />} />
      </Routes>
    </div>
  );
}

export default App;
