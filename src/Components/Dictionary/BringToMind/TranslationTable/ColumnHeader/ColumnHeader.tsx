import React, { ChangeEvent, FC } from "react";
import { fields, sortOrders } from "../TranslationTable";
import "./styles.scss";

interface ColumnHeaderProps {
  position: string;
  language: string;
  masked: string;
  onMaskToggle: (language: string) => void;
  onOrderToggle: (language: string) => void;
  sortByColumn: string;
  sortByField: fields;
  orderBy: sortOrders;
  onSortByFieldChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const ColumnHeader: FC<ColumnHeaderProps> = (props) => {
  const arrow = props.orderBy === sortOrders.DESC ? "⬇️" : "⬆️";

  console.log(Object.keys(fields));
  console.log(typeof fields);

  return (
    <div className="columnContainer">
      <h4>{props.language}</h4>
      <div>
        <button onClick={() => props.onMaskToggle(props.language)}>
          {props.masked === props.language ? "unmask" : "mask"}
        </button>
        <button onClick={() => props.onOrderToggle(props.language)}>
          sort by
          <select
            onClick={(e) => e.stopPropagation()}
            value={props.sortByField}
            onChange={(e) => props.onSortByFieldChange(e)}
          >
            {(Object.keys(fields) as Array<keyof typeof fields>).map((f) => {
              return <option key={f}>{fields[f]}</option>;
            })}
          </select>
          {props.language === props.sortByColumn ? arrow : ""}
        </button>
      </div>
      {/*<div>sortByColumn: {props.sortByColumn} sortByField: {props.sortByField} orderBy: {props.orderBy}</div>*/}
    </div>
  );
};

export default ColumnHeader;
