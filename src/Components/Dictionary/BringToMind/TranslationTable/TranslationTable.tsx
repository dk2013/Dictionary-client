import React, { FC, useState } from "react";
import "./styles.scss";
import { ColumnHeader } from "./ColumnHeader";
import { languageCodes } from "../../../../Common/Constants/dictionary";
import { Row } from "./Row";
import { tDictionary } from "../../../../Common/Types/dictionary";
import { LanguageSelector } from "../../../../Common/Components/LanguageSelector";

interface TranslationTableProps {
  dictionary: tDictionary;
  translateFrom: string;
  translateTo: string;
  onSwapLanguages: () => void;
}

export const maskedColumns = {
  ...languageCodes,
  NONE: "NONE",
  // BOTH: "BOTH", // Doesn't make sense
};

export const positionColumns = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

const TranslationTable: FC<TranslationTableProps> = (props) => {
  console.log(props.dictionary[props.translateFrom]);

  const [masked, setMasked] = useState<string>(languageCodes.NONE);
  const handleMaskToggle = (language: string) => {
    switch (language) {
      case masked:
        setMasked(languageCodes.NONE)
        break;
      default:
        setMasked(language)
    }
  }

  return (
    <div className="tableContainer">
      <div className="headerContainer">
        <ColumnHeader
          position={positionColumns.LEFT}
          language={props.translateFrom}
          masked={masked}
          onMaskToggle={handleMaskToggle}
        />
        <LanguageSelector
          onSwapLanguages={props.onSwapLanguages}
          translateFrom={props.translateFrom}
          translateTo={props.translateTo}
        />
        <ColumnHeader
          position={positionColumns.RIGHT}
          language={props.translateTo}
          masked={masked}
          onMaskToggle={handleMaskToggle}
        />
      </div>
      <div className="bodyContainer">
        {Object.entries(props.dictionary[props.translateFrom] || {}).map(
          ([k, v]) => (
            <Row
              key={k}
              word={k}
              translation={v.translation[props.translateTo] || ""}
              masked={masked}
              translateFrom={props.translateFrom}
              translateTo={props.translateTo}
            />
          )
        )}
      </div>
    </div>
  );
};

export default TranslationTable;
