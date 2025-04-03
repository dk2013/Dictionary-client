import { FC } from "react";
import { Page } from "../../Page";
import { PageHeader } from "../../../Common/Components/PageHeader";
import { TranslationTable } from "./TranslationTable";
import { tDictionary } from "../../../Common/Types/dictionary";

interface IBringToMindProps {
  title?: string;
  dictionary: tDictionary;
  translationFrom: string;
  translationTo: string;
  changeTranslateFrom: (v: string) => void;
  changeTranslationTo: (v: string) => void;
}

const BringToMind: FC<IBringToMindProps> = (props) => {
  const handleSwapLanguages = () => {
    const newTranslationTo = props.translationFrom;
    const newTranslateFrom = props.translationTo;

    props.changeTranslateFrom(newTranslateFrom);
    props.changeTranslationTo(newTranslationTo);
  };

  return (
    <Page title={props.title}>
      <div className="fancy-table-container">
        <PageHeader>Bring To Mind</PageHeader>
        <TranslationTable
          dictionary={props.dictionary}
          translationFrom={props.translationFrom}
          translationTo={props.translationTo}
          onSwapLanguages={handleSwapLanguages}
        />
      </div>
    </Page>
  );
};

export default BringToMind;
