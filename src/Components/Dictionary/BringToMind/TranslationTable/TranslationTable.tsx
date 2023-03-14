import React, { FC } from "react";
import "./styles.scss";
import { ColumnHeader } from "./ColumnHeader";
import { languageCodes } from "../../../../Common/Constants/dictionary";
import { Row } from "./Row";
import { tDictionary } from "../../../../Common/Types/dictionary";

interface TranslationTableProps {
  dictionary: tDictionary;
  translateFrom: languageCodes;
  translateTo: languageCodes;
}

const TranslationTable: FC<TranslationTableProps> = (props) => {
  console.log(props.dictionary[props.translateFrom]);

  return (
    <div className="tableContainer">
      <div className="headerContainer">
        <ColumnHeader position="left" language={props.translateFrom} />
        <ColumnHeader position="right" language={props.translateTo} />
      </div>
      <div className="bodyContainer">
        {Object.entries(props.dictionary[props.translateFrom] || {}).map(
          ([k, v]) => (
            <Row
              key={k}
              word={k}
              translation={v.translation[props.translateTo] || ""}
            />
          )
        )}
      </div>
    </div>
  );
};

export default TranslationTable;
