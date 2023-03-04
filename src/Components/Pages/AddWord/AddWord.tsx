import { FC } from "react";
import { Page } from "../../Page";
import { LanguageSelector } from "../../LanguageSelector";
import { PageHeader } from "../../Page/PageHeader";

const AddWord: FC = () => {
  return (
    <Page>
      <PageHeader>Add Word</PageHeader>
      <LanguageSelector />
      <p>new word</p>
    </Page>
  );
};

export default AddWord;
