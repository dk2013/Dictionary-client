import React, { ChangeEvent, FC, useState } from "react";
import "./styles.scss";
import { ColumnHeader } from "./ColumnHeader";
import { languageCodes } from "../../../../Common/Constants/dictionary";
import { Row } from "./Row";
import {
  SortedDictionary,
  tDictionary,
} from "../../../../Common/Types/dictionary";
import { LanguageSelector } from "../../../../Common/Components/LanguageSelector";
import { sort } from "./utils";

interface TranslationTableProps {
  dictionary: tDictionary;
  translationFrom: string;
  translationTo: string;
  onSwapLanguages: () => void;
}

export const selectedColumns = {
  ...languageCodes,
  NONE: "NONE",
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

  let sortedDictionary: SortedDictionary | null = null;

  // Sort a dictionary object (convert it to a sorted array)
  if (props.dictionary && props.translationFrom in props.dictionary) {
    sortedDictionary = Object.entries(props.dictionary[props.translationFrom]);

    sort(
      orderBy,
      sortByColumn,
      sortByField,
      sortedDictionary,
      props.translationFrom,
      props.translationTo
    );
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
          language={props.translationFrom}
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
          translationFrom={props.translationFrom}
          translationTo={props.translationTo}
        />
        <ColumnHeader
          position={positionColumns.RIGHT}
          language={props.translationTo}
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
        {sortedDictionary &&
          sortedDictionary.map(([k, v]) => (
            <Row
              key={k}
              word={k}
              translation={v[props.translationTo]?.[0].translation || ""}
              masked={masked}
              translationFrom={props.translationFrom}
              translationTo={props.translationTo}
            />
          ))}
      </div>
    </div>
  );
};

export default TranslationTable;
