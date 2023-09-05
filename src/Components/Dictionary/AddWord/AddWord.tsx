import { FC, useEffect, useState, useCallback } from "react";
import { Page } from "../../Page";
import { LanguageSelector } from "../../../Common/Components/LanguageSelector";
import { PageHeader } from "../../../Common/Components/PageHeader";
import { NewWordInput } from "./NewWordInput";
import { TranslationInput } from "./TranslationInput";
import { Button } from "../../../Common/Components/Button";
import { tDictionary } from "../../../Common/Types/dictionary";
import { AiOutlineDelete } from "react-icons/ai";

interface AddWordProps {
  title?: string;
  dictionary: tDictionary;
  translateFrom: string;
  translateTo: string;
  onSaveTranslation: (
    newWord: string,
    translation: string,
    translateFrom: string,
    translateTo: string
  ) => void;
  onDeleteTranslation: (
    newWord: string,
    translation: string,
    translateFrom: string,
    translateTo: string
  ) => void;
  changeTranslateFrom: (v: string) => void;
  changeTranslateTo: (v: string) => void;
}

const AddWord: FC<AddWordProps> = (props) => {
  const [newWord, setNewWord] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [translationExists, setTranslationExists] = useState<boolean>(false);

  const getTranslationFromDictionary = useCallback(
    (word: string, translateFrom: string, translateTo: string) => {
      return props.dictionary[translateFrom]?.[word]?.[translateTo]?.[0]
        .translation;
    },
    [props.dictionary]
  );

  useEffect(() => {
    const translatedWord = getTranslationFromDictionary(
      newWord,
      props.translateFrom,
      props.translateTo
    );

    setTranslationExists(translatedWord === translation);
  }, [
    newWord,
    translation,
    props.translateFrom,
    props.translateTo,
    getTranslationFromDictionary,
  ]);

  const handleNewWordChange = (enteredWord: string) => {
    setNewWord(enteredWord);
    const translatedWord = getTranslationFromDictionary(
      enteredWord,
      props.translateFrom,
      props.translateTo
    );

    setTranslation(translatedWord || "");
  };

  const handleTranslationChange = (enteredWord: string) => {
    setTranslation(enteredWord);
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
  };

  const handleDelete = () => {
    props.onDeleteTranslation(
      newWord,
      translation,
      props.translateFrom,
      props.translateTo
    );

    setNewWord("");
    setTranslation("");
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
      <Button
        onSave={handleDelete}
        disabled={!newWord || !translation || !translationExists}
      >
        <AiOutlineDelete></AiOutlineDelete>
      </Button>
      <TranslationInput
        value={translation}
        onTranslationChange={(v: string) => handleTranslationChange(v)}
        onKeyDown={handleKeyDown}
      />
      <Button
        onSave={handleSave}
        disabled={!newWord || !translation || translationExists}
      >
        Save translation
      </Button>
      <button onClick={() => console.log(props.dictionary)}>
        {/*The button for the debug purpose */}
        show dictionary
      </button>
    </Page>
  );
};

export default AddWord;
