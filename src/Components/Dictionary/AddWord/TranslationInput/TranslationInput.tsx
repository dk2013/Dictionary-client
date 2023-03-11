import React, { FC } from "react";
import "./styles.scss";

interface TranslationProps {
  onTranslationChange: (e: string) => void;
  value: string;
}

const TranslationInput: FC<TranslationProps> = (props) => {
  return (
    <div className="inputContainer">
      <input
        className="input"
        value={props.value}
        onChange={(e) => props.onTranslationChange(e.target.value)}
      />
    </div>
  );
};

export default TranslationInput;
