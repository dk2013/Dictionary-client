import { FC } from "react";
import { Page } from "../../Page";
import { PageHeader } from "../../../Common/Components/PageHeader";
import { TranslationTable } from "./TranslationTable";
import { tDictionary } from "../../../Common/Types/dictionary";

interface BringToMindProps {
  title?: string;
  dictionary: tDictionary;
  translateFrom: string;
  translateTo: string;
  changeTranslateFrom: (v: string) => void;
  changeTranslateTo: (v: string) => void;
}

const BringToMind: FC<BringToMindProps> = (props) => {
  const handleSwapLanguages = () => {
    const newTranslateTo = props.translateFrom;
    const newTranslateFrom = props.translateTo;

    props.changeTranslateFrom(newTranslateFrom);
    props.changeTranslateTo(newTranslateTo);
  };

  return (
    <Page title={props.title}>
      <PageHeader>Bring To Mind</PageHeader>
      <TranslationTable
        dictionary={props.dictionary}
        translateFrom={props.translateFrom}
        translateTo={props.translateTo}
        onSwapLanguages={handleSwapLanguages}
      />
    </Page>
  );
};

export default BringToMind;
