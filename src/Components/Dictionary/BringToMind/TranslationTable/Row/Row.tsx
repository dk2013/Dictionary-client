import React, { FC } from "react";
import "./styles.scss";

interface RowProps {
  word: string;
  translation: string;
  masked: string;
  translationFrom: string;
  translationTo: string;
}

const MASK = "---";

const Row: FC<RowProps> = (props) => {
  return (
    <div className="rowContainer">
      <div className="cell">
        {props.masked === props.translationFrom ? MASK : props.word}
      </div>
      <div className="cell">
        {props.masked === props.translationTo ? MASK : props.translation}
      </div>
    </div>
  );
};

export default Row;
