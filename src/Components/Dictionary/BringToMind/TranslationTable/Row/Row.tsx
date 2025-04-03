import React, { FC } from "react";

interface IRowProps {
  word: string;
  translation: string;
  masked: string;
  translationFrom: string;
  translationTo: string;
}

const MASK = "---";

const Row: FC<IRowProps> = (props) => {
  return (
    <tr>
      <td>{props.masked === props.translationFrom ? MASK : props.word}</td>
      <td>{props.masked === props.translationTo ? MASK : props.translation}</td>
    </tr>
  );
};

export default Row;
