import React, { FC } from "react";
import "./styles.scss";

interface RowProps {
  word: string;
  translation: string;
}

const Row: FC<RowProps> = (props) => {
  return (
    <div className="rowContainer">
      <div className="cell">{props.word}</div>
      <div className="cell">{props.translation}</div>
    </div>
  );
};

export default Row;
