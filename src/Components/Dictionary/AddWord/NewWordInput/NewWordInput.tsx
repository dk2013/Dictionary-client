import React, { FC } from "react";
import "./styles.scss";

interface NewWordInputProps {
  value: string;
  onNewWordChange: (e: string) => void;
  onKeyDown: (key: string) => void;
}

const NewWordInput: FC<NewWordInputProps> = (props) => {
  return (
    <div className="inputContainer">
      <input
        className="input"
        value={props.value}
        onChange={(e) => props.onNewWordChange(e.target.value)}
        onKeyDown={(e) => props.onKeyDown(e.key)}
      />
    </div>
  );
};

export default NewWordInput;
