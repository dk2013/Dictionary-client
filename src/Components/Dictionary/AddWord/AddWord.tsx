import { FC, useState } from "react";
import { Page } from "../../Page";
import { LanguageSelector } from "./LanguageSelector";
import { PageHeader } from "../../Page/PageHeader";
import { NewWordInput } from "./NewWordInput";
import { TranslationInput } from "./TranslationInput";
import { SaveButton } from "../../../Common/Components/SaveButton";
import { languageCodes } from "../../../Common/Constants/dictionary";
import { tDictionary } from "../../../Common/Types/dictionary";

interface AddWordProps {
  title?: string;
  dictionary: tDictionary;
  onSaveTranslation: (
    newWord: string,
    translation: string,
    translateFrom: languageCodes,
    translateTo: languageCodes
  ) => void;
}

const AddWord: FC<AddWordProps> = (props) => {
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

  const handleKeyDown = (key: string) => {
    if (key === "Enter") {
      handleSave();
    }
  };

  const handleSave = () => {
    props.onSaveTranslation(newWord, translation, translateFrom, translateTo);
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
    return props.dictionary[translateFrom]?.[word]?.translation?.[translateTo];
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
        onKeyDown={handleKeyDown}
      />
      <TranslationInput
        value={translation}
        onTranslationChange={(v: string) => handleTranslationChange(v)}
        onKeyDown={handleKeyDown}
      />
      <SaveButton onSave={handleSave} disabled={!newWord || !translation}>
        Save translation
      </SaveButton>
      <button onClick={() => console.log(props.dictionary)}>
        show dictionary
      </button>
    </Page>
  );
};

export default AddWord;
