import { FC } from "react";
import { Page } from "../../Page";
import { PageHeader } from "../../../Common/Components/PageHeader";
import { TranslationTable } from "./TranslationTable";
import { languageCodes } from "../../../Common/Constants/dictionary";
import { tDictionary } from "../../../Common/Types/dictionary";

interface BringToMindProps {
  title?: string;
  dictionary: tDictionary;
  translateFrom: languageCodes;
  translateTo: languageCodes;
}

const BringToMind: FC<BringToMindProps> = (props) => {
  return (
    <Page title={props.title}>
      <PageHeader>Bring To Mind</PageHeader>
      <TranslationTable
        dictionary={props.dictionary}
        translateFrom={props.translateFrom}
        translateTo={props.translateTo}
      />
    </Page>
  );
};

export default BringToMind;
