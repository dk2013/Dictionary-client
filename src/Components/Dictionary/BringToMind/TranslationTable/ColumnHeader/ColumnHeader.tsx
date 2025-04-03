import React, { ChangeEvent, FC } from "react";
import { fields, sortOrders } from "../TranslationTable";
import DoubleArrowsIcon from "../../../../../Common/Components/Icons/DoubleArrowsIcon";
import styles from "./ColumnHeader.module.scss";

interface IColumnHeaderProps {
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

const ColumnHeader: FC<IColumnHeaderProps> = (props) => {
  return (
    <div className={styles.columnHeader}>
      <button
        className="btn column-header-btn"
        onClick={() => props.onMaskToggle(props.language)}
      >
        {props.masked === props.language ? "unmask" : "mask"}
      </button>
      <button
        className="btn column-header-btn margin-0"
        onClick={() => props.onOrderToggle(props.language)}
      >
        sort by
        <select
          className="table-sort-select"
          onClick={(e) => e.stopPropagation()}
          value={props.sortByField}
          onChange={(e) => props.onSortByFieldChange(e)}
        >
          {(Object.keys(fields) as Array<keyof typeof fields>).map((f) => {
            return <option key={f}>{fields[f]}</option>;
          })}
        </select>
        {props.language === props.sortByColumn ? (
          <DoubleArrowsIcon orderBy={props.orderBy} />
        ) : (
          ""
        )}
      </button>
    </div>
  );
};

export default ColumnHeader;
