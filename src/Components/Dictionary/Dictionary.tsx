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
import fetchUser from "../../Utils/auth";

interface User {
  _id: string;
  googleId: number;
  displayName: string;
  email: string;
}

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Dictionary: FC = () => {
  const [dictionary, setDictionary] = useState<tDictionary>(dictionaryObj);
  const [translationFrom, setTranslateFrom] = useState<string>(
    languageCodes.ENG
  );
  const [translationTo, setTranslationTo] = useState<string>(languageCodes.RUS);
  const [user, setUser] = useState<User | null>(null);

  console.log("user", user);

  const getDictionary = useCallback(async (userId: string) => {
    try {
      const result = await fetch(
        `${REACT_APP_SERVER_URL}/dictionaries/users/${userId}`
      );
      const dictionary: tDictionary = await result.json();
      setDictionary(dictionary ?? dictionaryObj);
    } catch (error) {
      console.error("Error fetching dictionary:", error);
    }
  }, []);

  useEffect(() => {
    async function getUser() {
      const userData = await fetchUser();
      setUser(userData);
    }

    getUser();
  }, []);

  useEffect(() => {
    if (user?._id) getDictionary(user._id);
  }, [getDictionary, user]);

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
        saveTranslationToDb(
          newWord,
          translation,
          translationFrom,
          translationTo
        );

        return updatedDictionary;
      });
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
      deleteTranslationFromDb(newWord, translationFrom, translationTo);

      return updatedDictionary;
    });
  };

  const saveTranslationToDb = (
    newWord: string,
    translation: string,
    translationFrom: string,
    translationTo: string
  ) => {
    const hardcodedDictionaryId = "6757d9cb74529a16e5bc1396";

    fetch(
      `${REACT_APP_SERVER_URL}/dictionaries/${hardcodedDictionaryId}/translations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newWord,
          translation,
          translationFrom,
          translationTo,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteTranslationFromDb = (
    newWord: string,
    translationFrom: string,
    translationTo: string
  ) => {
    const hardcodedDictionaryId = "6757d9cb74529a16e5bc1396";

    fetch(
      `${REACT_APP_SERVER_URL}/dictionaries/${hardcodedDictionaryId}/translations?newWord=${newWord}&translationFrom=${translationFrom}&translationTo=${translationTo}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
