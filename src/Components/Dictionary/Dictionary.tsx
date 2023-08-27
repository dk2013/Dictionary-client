import React, { FC, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { AddWord } from "./AddWord";
import { BringToMind } from "./BringToMind";
import { Exam } from "./Exam";
import { Settings } from "./Settings";
import { tDictionary } from "../../Common/Types/dictionary";
import {
  dictionaryObj,
  languageCodes,
} from "../../Common/Constants/dictionary";
import {
  saveAndGetUpdatedDictionary,
  deleteAndGetUpdatedDictionary,
} from "./utils";

const Dictionary: FC = () => {
  const [dictionary, setDictionary] = useState<tDictionary>(dictionaryObj);
  const [translateFrom, setTranslateFrom] = useState<languageCodes>(
    languageCodes.ENG
  );
  const [translateTo, setTranslateTo] = useState<languageCodes>(
    languageCodes.RUS
  );

  useEffect(() => {
    // Restore a Dictionary object from the Local Storage
    setDictionary(
      JSON.parse(localStorage.getItem("dictionary") || '""') || dictionaryObj
    );
  }, []);

  const handleSaveTranslation = (
    newWord: string,
    translation: string,
    translateFrom: languageCodes,
    translateTo: languageCodes
  ) => {
    if (newWord && translation) {
      // Save direct and reverse translation to React State
      setDictionary((prev) => {
        const updatedDictionary = saveAndGetUpdatedDictionary(
          prev,
          newWord,
          translation,
          translateFrom,
          translateTo
        );

        saveDictionaryToStorage("dictionary", updatedDictionary);

        return updatedDictionary;
      });
    }
  };

  const saveDictionaryToStorage = (
    key: string,
    dictionary: tDictionary
  ): void => {
    // TODO: Remember about the limit of 5Mb
    // Save Dictionary object to Local Storage
    try {
      localStorage.setItem("dictionary", JSON.stringify(dictionary));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteTranslation = (
    newWord: string,
    translation: string,
    translateFrom: languageCodes,
    translateTo: languageCodes
  ) => {
    setDictionary((prev) => {
      const updatedDictionary = deleteAndGetUpdatedDictionary(
        prev,
        newWord,
        translation,
        translateFrom,
        translateTo
      );

      saveDictionaryToStorage("dictionary", updatedDictionary);

      return updatedDictionary;
    });
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
            translateFrom={translateFrom}
            translateTo={translateTo}
            onSaveTranslation={handleSaveTranslation}
            onDeleteTranslation={handleDeleteTranslation}
            changeTranslateFrom={(v) => setTranslateFrom(v)}
            changeTranslateTo={(v) => setTranslateTo(v)}
          />
        }
      />
      <Route
        path="/bring-to-mind"
        element={
          <BringToMind
            title="Bring To Mind"
            dictionary={dictionary}
            translateFrom={translateFrom}
            translateTo={translateTo}
          />
        }
      />
      <Route path="/exam" element={<Exam title="Take An Exam" />} />
      <Route path="/settings" element={<Settings title="Settings" />} />
    </Routes>
  );
};
export default Dictionary;
