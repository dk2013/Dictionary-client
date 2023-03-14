import { FC, useState } from "react";
import { Page } from "../../Page";
import { LanguageSelector } from "./LanguageSelector";
import { PageHeader } from "../../../Common/Components/PageHeader";
import { NewWordInput } from "./NewWordInput";
import { TranslationInput } from "./TranslationInput";
import { SaveButton } from "../../../Common/Components/SaveButton";
import { languageCodes } from "../../../Common/Constants/dictionary";
import { tDictionary } from "../../../Common/Types/dictionary";

interface AddWordProps {
  title?: string;
  dictionary: tDictionary;
  translateFrom: languageCodes;
  translateTo: languageCodes;
  onSaveTranslation: (
    newWord: string,
    translation: string,
    translateFrom: languageCodes,
    translateTo: languageCodes
  ) => void;
  changeTranslateFrom: (v: languageCodes) => void;
  changeTranslateTo: (v: languageCodes) => void;
}

const AddWord: FC<AddWordProps> = (props) => {
  const [newWord, setNewWord] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");

  const handleNewWordChange = (enteredWord: string) => {
    setNewWord(enteredWord);
    const translatedWord = getTranslationFromDictionary(
      enteredWord,
      props.translateFrom,
      props.translateTo
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
    props.onSaveTranslation(
      newWord,
      translation,
      props.translateFrom,
      props.translateTo
    );
  };

  const handleSwapLanguages = () => {
    if (translation.length) {
      setNewWord(translation);

      const newTranslateTo = props.translateFrom;
      const newTranslateFrom = props.translateTo;
      const translatedWord = getTranslationFromDictionary(
        translation,
        newTranslateFrom,
        newTranslateTo
      );

      setTranslation(translatedWord || "");
      props.changeTranslateFrom(newTranslateFrom);
      props.changeTranslateTo(newTranslateTo);
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
        translateFrom={props.translateFrom}
        translateTo={props.translateTo}
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
