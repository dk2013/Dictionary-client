import React, { FC } from "react";
import "./styles.scss";

interface RowProps {
  word: string;
  translation: string;
  masked: string;
  translateFrom: string;
  translateTo: string;
}

const MASK = "---";

const Row: FC<RowProps> = (props) => {
  return (
    <div className="rowContainer">
      <div className="cell">
        {props.masked === props.translateFrom ? MASK : props.word}
      </div>
      <div className="cell">
        {props.masked === props.translateTo ? MASK : props.translation}
      </div>
    </div>
  );
};

export default Row;
