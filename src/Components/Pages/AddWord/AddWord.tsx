import { FC, useState } from "react";
import { Page } from "../../Page";
import { LanguageSelector } from "../../LanguageSelector";
import { PageHeader } from "../../Page/PageHeader";
import { NewWordInput } from "../../NewWordInput";
import { TranslationInput } from "../../TranslationInput";
import { SaveButton } from "../../Common/SaveButton";

interface AddWordProps {
  title?: string;
}

const AddWord: FC<AddWordProps> = (props) => {
  const [newWord, setNewWord] = useState("");
  const [translation, setTranslation] = useState("");

  const handleNewWordChange = (v: string) => {
    setNewWord(v);
  };

  const handleTranslationChange = (v: string) => {
    setTranslation(v);
  };

  const handleSave = () => {
    console.log("save");
  };

  return (
    <Page title={props.title}>
      <PageHeader>Add Word</PageHeader>
      <LanguageSelector />
      <NewWordInput
        value={newWord}
        onNewWordChange={(v: string) => handleNewWordChange(v)}
      />
      <TranslationInput
        value={translation}
        onTranslationChange={(v: string) => handleTranslationChange(v)}
      />
      <SaveButton onSave={handleSave}>Save</SaveButton>
    </Page>
  );
};

export default AddWord;
