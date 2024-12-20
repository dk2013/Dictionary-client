import { FC } from "react";
import { Page } from "../../Page";
import { PageHeader } from "../../../Common/Components/PageHeader";
import { LanguageSelector } from "../../../Common/Components/LanguageSelector";
import { Block } from "../../../Common/Components/Block";

interface ExamProps {
  title?: string;
  translationFrom: string;
  translationTo: string;
  changeTranslateFrom: (v: string) => void;
  changeTranslationTo: (v: string) => void;
}

const Exam: FC<ExamProps> = (props) => {
  const handleSwapLanguages = () => {
    const newTranslationTo = props.translationFrom;
    const newTranslateFrom = props.translationTo;

    props.changeTranslateFrom(newTranslateFrom);
    props.changeTranslationTo(newTranslationTo);
  };

  return (
    <Page title={props.title}>
      <PageHeader>Check Yourself</PageHeader>
      <Block extraContainerClassName="textBlock">Translate word</Block>
      <LanguageSelector
        translationFrom={props.translationFrom}
        translationTo={props.translationTo}
        onSwapLanguages={handleSwapLanguages}
      />
    </Page>
  );
};

export default Exam;
