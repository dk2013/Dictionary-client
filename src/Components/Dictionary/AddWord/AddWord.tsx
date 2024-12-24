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
  translationFrom: string;
  translationTo: string;
  onSaveTranslation: (
    newWord: string,
    translation: string,
    translationFrom: string,
    translationTo: string
  ) => void;
  onDeleteTranslation: (
    newWord: string,
    translationFrom: string,
    translationTo: string
  ) => void;
  changeTranslateFrom: (v: string) => void;
  changeTranslationTo: (v: string) => void;
}

const AddWord: FC<AddWordProps> = (props) => {
  const [newWord, setNewWord] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [translationExists, setTranslationExists] = useState<boolean>(false);

  const getTranslationFromDictionary = useCallback(
    (word: string, translationFrom: string, translationTo: string) => {
      return props.dictionary[translationFrom]?.[word]?.[translationTo]?.[0]
        .translation;
    },
    [props.dictionary]
  );

  useEffect(() => {
    const translatedWord = getTranslationFromDictionary(
      newWord,
      props.translationFrom,
      props.translationTo
    );

    setTranslationExists(translatedWord === translation);
  }, [
    newWord,
    translation,
    props.translationFrom,
    props.translationTo,
    getTranslationFromDictionary,
  ]);

  const handleNewWordChange = (enteredWord: string) => {
    setNewWord(enteredWord);
    const translatedWord = getTranslationFromDictionary(
      enteredWord,
      props.translationFrom,
      props.translationTo
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
    if(translationExists) return;

    props.onSaveTranslation(
      newWord,
      translation,
      props.translationFrom,
      props.translationTo
    );
  };

  const handleSwapLanguages = () => {
    setNewWord(translation);

    const newTranslationTo = props.translationFrom;
    const newTranslateFrom = props.translationTo;
    const translatedWord = getTranslationFromDictionary(
      translation,
      newTranslateFrom,
      newTranslationTo
    );

    setTranslation(translatedWord || "");
    props.changeTranslateFrom(newTranslateFrom);
    props.changeTranslationTo(newTranslationTo);
  };

  const handleDelete = () => {
    props.onDeleteTranslation(
      newWord,
      props.translationFrom,
      props.translationTo
    );

    setNewWord("");
    setTranslation("");
  };

  return (
    <Page title={props.title}>
      <PageHeader>Add Word</PageHeader>
      <LanguageSelector
        translationFrom={props.translationFrom}
        translationTo={props.translationTo}
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
