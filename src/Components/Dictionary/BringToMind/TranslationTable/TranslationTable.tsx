import React, { ChangeEvent, FC, useState } from "react";
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

export const selectedColumns = {
  ...languageCodes,
  NONE: "NONE",
  // BOTH: "BOTH", // Doesn't make sense
};

export const positionColumns = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

export enum fields {
  NAME = "name",
  MODIFIED = "modified",
}

export const enum sortOrders {
  ASC = "ASC",
  DESC = "DESC",
}

const TranslationTable: FC<TranslationTableProps> = (props) => {
  const [masked, setMasked] = useState<string>(selectedColumns.NONE);
  const [sortByColumn, setSortByColumn] = useState<string>(languageCodes.ENG);
  const [sortByField, setSortByField] = useState<fields>(fields.NAME);
  const [orderBy, setOrderBy] = useState<sortOrders>(sortOrders.ASC);

  // console.log(Object.keys(fields))

  // Sort a dictionary object (convert it to a sorted array)
  let sortedDictionary = Object.entries(props.dictionary[props.translateFrom]);
  if (props.translateFrom === sortByColumn) {
    sortedDictionary.sort((a, b) => {
      return (orderBy === sortOrders.DESC ? -1 : 1) * a[0].localeCompare(b[0]);
    });
  } else {
    sortedDictionary.sort((a, b) => {
      return (
        (orderBy === sortOrders.DESC ? -1 : 1) *
        a[1].translation[props.translateTo].localeCompare(
          b[1].translation[props.translateTo]
        )
      );
    });
  }

  const handleMaskToggle = (language: string) => {
    switch (language) {
      case masked:
        setMasked(languageCodes.NONE);
        break;
      default:
        setMasked(language);
    }
  };

  const handleOrderToggle = (language: string) => {
    switch (language) {
      case sortByColumn:
        // setOrderBy(languageCodes.NONE);
        if (orderBy === sortOrders.ASC) {
          setOrderBy(sortOrders.DESC);
        } else {
          setOrderBy(sortOrders.ASC);
        }
        break;
      default: // languageCodes.ENG
        setSortByColumn(language);
        setOrderBy(sortOrders.ASC);
    }
  };

  const handleSortByFieldChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortByField(e.target.value as fields);
  };

  return (
    <div className="tableContainer">
      <div className="headerContainer">
        <ColumnHeader
          position={positionColumns.LEFT}
          language={props.translateFrom}
          masked={masked}
          onMaskToggle={handleMaskToggle}
          onOrderToggle={handleOrderToggle}
          sortByColumn={sortByColumn}
          sortByField={sortByField}
          orderBy={orderBy}
          onSortByFieldChange={handleSortByFieldChange}
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
          onOrderToggle={handleOrderToggle}
          sortByColumn={sortByColumn}
          sortByField={sortByField}
          orderBy={orderBy}
          onSortByFieldChange={handleSortByFieldChange}
        />
      </div>
      <div className="bodyContainer">
        {sortedDictionary.map(([k, v]) => (
          <Row
            key={k}
            word={k}
            translation={v.translation[props.translateTo] || ""}
            masked={masked}
            translateFrom={props.translateFrom}
            translateTo={props.translateTo}
          />
        ))}
      </div>
    </div>
  );
};

export default TranslationTable;
