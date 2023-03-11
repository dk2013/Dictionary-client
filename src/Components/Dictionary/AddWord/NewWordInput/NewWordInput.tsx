import React, { FC } from "react";
import "./styles.scss";

interface NewWordInputProps {
  onNewWordChange: (e: string) => void;
  value: string;
}

const NewWordInput: FC<NewWordInputProps> = (props) => {
  return (
    <div className="inputContainer">
      <input
        className="input"
        value={props.value}
        onChange={(e) => props.onNewWordChange(e.target.value)}
      />
    </div>
  );
};

export default NewWordInput;
