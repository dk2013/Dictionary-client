import React, { FC, useCallback, useEffect, useState } from "react";
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

const BASE_API_URL = "http://localhost:8000";

const Dictionary: FC = () => {
  const [dictionary, setDictionary] = useState<tDictionary>(dictionaryObj);
  const [translationFrom, setTranslateFrom] = useState<string>(languageCodes.ENG);
  const [translationTo, setTranslationTo] = useState<string>(languageCodes.RUS);

  const getDictionary = useCallback(async () => {
    try {
      const hardcodedDictionaryId = '6757d9cb74529a16e5bc1396';
      const result = await fetch(`${BASE_API_URL}/dictionaries/${hardcodedDictionaryId}`);
      const dictionary: tDictionary = await result.json();
      setDictionary(
        dictionary ?? dictionaryObj
      );
    } catch (error) {
      console.error("Error fetching dictionary:", error);
    }
  }, []);

  useEffect(() => {
    getDictionary();
  }, [getDictionary]);

  const handleSaveTranslation = (
    newWord: string,
    translation: string,
    translationFrom: string,
    translationTo: string
  ) => {
    if (newWord && translation) {
      // Save direct and reverse translation to React State
      setDictionary((prev) => {
        const updatedDictionary = saveAndGetUpdatedDictionary(
          prev,
          newWord,
          translation,
          translationFrom,
          translationTo
        );

        saveDictionaryToStorage("dictionary", updatedDictionary);
        saveTranslationToDb(newWord, translation, translationFrom, translationTo);

        return updatedDictionary;
      });
    }
  };

  const saveTranslationToDb = (newWord: string, translation: string, translationFrom: string, translationTo: string) => {
    const hardcodedDictionaryId = '6757d9cb74529a16e5bc1396';

    fetch(`${BASE_API_URL}/dictionaries/${hardcodedDictionaryId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newWord,
        translation,
        translationFrom,
        translationTo
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const saveDictionaryToStorage = (
    key: string,
    dictionary: tDictionary
  ): void => {
    // TODO: Remember about the limit of 5Mb
    // Save Dictionary object to Local Storage
    try {
      localStorage.setItem(key, JSON.stringify(dictionary));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteTranslation = (
    newWord: string,
    translationFrom: string,
    translationTo: string
  ) => {
    setDictionary((prev) => {
      const updatedDictionary = deleteAndGetUpdatedDictionary(
        prev,
        newWord,
        translationFrom,
        translationTo
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
            translationFrom={translationFrom}
            translationTo={translationTo}
            onSaveTranslation={handleSaveTranslation}
            onDeleteTranslation={handleDeleteTranslation}
            changeTranslateFrom={(v) => setTranslateFrom(v)}
            changeTranslationTo={(v) => setTranslationTo(v)}
          />
        }
      />
      <Route
        path="/bring-to-mind"
        element={
          <BringToMind
            title="Bring To Mind"
            dictionary={dictionary}
            translationFrom={translationFrom}
            translationTo={translationTo}
            changeTranslateFrom={(v) => setTranslateFrom(v)}
            changeTranslationTo={(v) => setTranslationTo(v)}
          />
        }
      />
      <Route
        path="/exam"
        element={
          <Exam
            title="Check Yourself"
            translationFrom={translationFrom}
            translationTo={translationTo}
            changeTranslateFrom={(v) => setTranslateFrom(v)}
            changeTranslationTo={(v) => setTranslationTo(v)}
          />
        }
      />
      <Route path="/settings" element={<Settings title="Settings" />} />
    </Routes>
  );
};
export default Dictionary;
