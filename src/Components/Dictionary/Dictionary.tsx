import React, { FC, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { AddWord } from "./AddWord";
import { GetToKnow } from "./GetToKnow";
import { Exam } from "./Exam";
import { Settings } from "./Settings";
import { tDictionary } from "../../Common/Types/dictionary";
import { dictionaryObj, languageCodes } from "../../Common/Constants/dictionary";
import { getUpdatedDictionary } from "./utils";

const Dictionary: FC = () => {
  const [dictionary, setDictionary] = useState<tDictionary>(dictionaryObj);

  const handleSaveTranslation = (
    newWord: string,
    translation: string,
    translateFrom: languageCodes,
    translateTo: languageCodes
  ) => {
    if (newWord && translation) {
      console.log("save");

      setDictionary((prev) => {
        // Save direct and reverse translation
        return getUpdatedDictionary(
          prev,
          newWord,
          translation,
          translateFrom,
          translateTo
        );
      });
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route
        path="/add-word"
        element={
          <AddWord
            title="Add Word"
            dictionary={dictionary}
            onSaveTranslation={handleSaveTranslation}
          />
        }
      />
      <Route path="/get-to-know" element={<GetToKnow title="Get To Know" />} />
      <Route path="/exam" element={<Exam title="Take an Exam" />} />
      <Route path="/settings" element={<Settings title="Settings" />} />
    </Routes>
  );
};
export default Dictionary;
