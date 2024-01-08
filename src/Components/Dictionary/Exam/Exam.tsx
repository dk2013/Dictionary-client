import { FC } from "react";
import { Page } from "../../Page";
import { PageHeader } from "../../../Common/Components/PageHeader";
import { LanguageSelector } from "../../../Common/Components/LanguageSelector";
import { Block } from "../../../Common/Components/Block";

interface ExamProps {
  title?: string;
  translateFrom: string;
  translateTo: string;
  changeTranslateFrom: (v: string) => void;
  changeTranslateTo: (v: string) => void;
}

const Exam: FC<ExamProps> = (props) => {
  const handleSwapLanguages = () => {
    const newTranslateTo = props.translateFrom;
    const newTranslateFrom = props.translateTo;

    props.changeTranslateFrom(newTranslateFrom);
    props.changeTranslateTo(newTranslateTo);
  };

  return (
    <Page title={props.title}>
      <PageHeader>Check Yourself</PageHeader>
      <Block extraContainerClassName="textBlock">Translate word</Block>
      <LanguageSelector
        translateFrom={props.translateFrom}
        translateTo={props.translateTo}
        onSwapLanguages={handleSwapLanguages}
      />
    </Page>
  );
};

export default Exam;
