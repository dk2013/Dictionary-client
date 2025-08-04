import { FC, useEffect, useState, useCallback } from "react";
import { Page } from "../../Page";
import { LanguageSelector } from "../../../Common/Components/LanguageSelector";
import { NewWordInput } from "./NewWordInput";
import { TranslationInput } from "./TranslationInput";
import { Button } from "../../../Common/Components/Button";
import { tDictionary } from "../../../Common/Types/dictionary";
import { PageHeader } from "../../../Common/Components/PageHeader";
import {
  newWordPlaceholders,
  translationPlaceholders,
} from "../../../Common/Constants/dictionary";
import { ENV, envs } from "../../../Common/Constants/global";

interface IAddWordProps {
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

const AddWord: FC<IAddWordProps> = (props) => {
  const [newWord, setNewWord] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [translationExists, setTranslationExists] = useState<boolean>(false);

  const newWordPlaceholder = newWordPlaceholders[props.translationFrom];
  const translationPlaceholder = translationPlaceholders[props.translationTo];

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
    if (translationExists) return;

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
    const newTranslationFrom = props.translationTo;
    const translatedWord = getTranslationFromDictionary(
      translation,
      newTranslationFrom,
      newTranslationTo
    );

    setTranslation(translatedWord || "");
    props.changeTranslateFrom(newTranslationFrom);
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
      <div className="fancy-controls">
        <PageHeader>Add Word</PageHeader>
        <div className="control-row centered">
          <LanguageSelector
            translationFrom={props.translationFrom}
            translationTo={props.translationTo}
            onSwapLanguages={handleSwapLanguages}
          />
        </div>
        <NewWordInput
          value={newWord}
          placeholder={newWordPlaceholder}
          onNewWordChange={(v: string) => handleNewWordChange(v)}
          onKeyDown={handleKeyDown}
        />
        <Button
          onSave={handleDelete}
          disabled={!newWord || !translation || !translationExists}
        >
          🗑️Clear
        </Button>
        <TranslationInput
          value={translation}
          placeholder={translationPlaceholder}
          onTranslationChange={(v: string) => handleTranslationChange(v)}
          onKeyDown={handleKeyDown}
        />
        <Button
          type={"fancy"}
          onSave={handleSave}
          disabled={!newWord || !translation || translationExists}
        >
          Save translation
        </Button>
        {ENV !== envs.PROD && (
          <button onClick={() => console.log(props.dictionary)}>
            {/*The button for the debug purpose */}
            show dictionary
          </button>
        )}
      </div>
    </Page>
  );
};

export default AddWord;
