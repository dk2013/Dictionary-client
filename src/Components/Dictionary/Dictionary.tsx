import React, { FC, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { AddWord } from "./AddWord";
import { GetToKnow } from "./GetToKnow";
import { Exam } from "./Exam";
import { Settings } from "./Settings";

export const enum languageCodes { // ISO 639-2 Code
  ENG = "ENG",
  RUS = "RUS",
  UKR = "UKR",
  SPA = "SPA",
  GER = "GER",
}

const Dictionary: FC = () => {
  const [dictionary, setDictionary] = useState();

  const handleSaveTranslation = () => {

  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add-word" element={<AddWord onSaveTranslation={() => handleSaveTranslation()} title="Add Word" />} />
      <Route path="/get-to-know" element={<GetToKnow title="Get To Know" />} />
      <Route path="/exam" element={<Exam title="Take an Exam" />} />
      <Route path="/settings" element={<Settings title="Settings" />} />
    </Routes>
  );
};
export default Dictionary;
