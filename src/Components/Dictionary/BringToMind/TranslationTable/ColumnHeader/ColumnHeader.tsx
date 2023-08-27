import React, { FC } from "react";
import "./styles.scss";
import { maskedColumns } from "../TranslationTable";

interface ColumnHeaderProps {
  position: string;
  language: string;
  masked: string;
  onMaskToggle: (language: string) => void;
}

const ColumnHeader: FC<ColumnHeaderProps> = (props) => {
  return (
    <div className="columnContainer">
      <h4>{props.language}</h4>
      <div>
        <button onClick={() => props.onMaskToggle(props.language)}>
          {props.masked === props.language
            ? "unmask"
            : "mask"}
        </button>
        <button>sort by name ⬇️</button>
      </div>
    </div>
  );
};

export default ColumnHeader;
