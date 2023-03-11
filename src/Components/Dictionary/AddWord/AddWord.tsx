import { FC, useState } from "react";
import { Page } from "../../Page";
import { LanguageSelector } from "./LanguageSelector";
import { PageHeader } from "../../Page/PageHeader";
import { NewWordInput } from "./NewWordInput";
import { TranslationInput } from "./TranslationInput";
import { SaveButton } from "../../Common/SaveButton";
import { getUpdatedDictionary } from "../utils";
import { tDictionary } from "../../Common/Types/dictionary";
import {
  dictionaryObj,
  languageCodes,
} from "../../Common/Constants/dictionary";

interface AddWordProps {
  title?: string;
  onSaveTranslation: () => void;
}

const AddWord: FC<AddWordProps> = (props) => {
  const [dictionary, setDictionary] = useState<tDictionary>(dictionaryObj);
  const [newWord, setNewWord] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [translateFrom, setTranslateFrom] = useState<languageCodes>(
    languageCodes.ENG
  );
  const [translateTo, setTranslateTo] = useState<languageCodes>(
    languageCodes.RUS
  );

  const handleNewWordChange = (enteredWord: string) => {
    setNewWord(enteredWord);
    const translatedWord = getTranslationFromDictionary(
      enteredWord,
      translateFrom,
      translateTo
    );

    setTranslation(translatedWord || "");
  };

  const handleTranslationChange = (v: string) => {
    setTranslation(v);
  };

  const handleSave = () => {
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

    props.onSaveTranslation();
  };

  const handleSwapLanguages = () => {
    if (translation.length) {
      setNewWord(translation);

      const newTranslateTo = translateFrom;
      const newTranslateFrom = translateTo;
      const translatedWord = getTranslationFromDictionary(
        translation,
        newTranslateFrom,
        newTranslateTo
      );

      setTranslation(translatedWord || "");
      setTranslateFrom(newTranslateFrom);
      setTranslateTo(newTranslateTo);
    }
  };

  const getTranslationFromDictionary = (
    word: string,
    translateFrom: languageCodes,
    translateTo: languageCodes
  ) => {
    return dictionary[translateFrom]?.[word]?.translation?.[translateTo];
  };

  return (
    <Page title={props.title}>
      <PageHeader>Add Word</PageHeader>
      <LanguageSelector
        translateFrom={translateFrom}
        translateTo={translateTo}
        onSwapLanguages={handleSwapLanguages}
      />
      <NewWordInput
        value={newWord}
        onNewWordChange={(v: string) => handleNewWordChange(v)}
      />
      <TranslationInput
        value={translation}
        onTranslationChange={(v: string) => handleTranslationChange(v)}
      />
      <SaveButton onSave={handleSave} disabled={!newWord || !translation}>
        Save translation
      </SaveButton>
      <button onClick={() => console.log(dictionary)}>show dictionary</button>
    </Page>
  );
};

export default AddWord;
