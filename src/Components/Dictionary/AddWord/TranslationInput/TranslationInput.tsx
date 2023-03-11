import React, { FC } from "react";
import "./styles.scss";

interface TranslationProps {
  value: string;
  onTranslationChange: (e: string) => void;
  onKeyDown: (key: string) => void;
}

const TranslationInput: FC<TranslationProps> = (props) => {
  return (
    <div className="inputContainer">
      <input
        className="input"
        value={props.value}
        onChange={(e) => props.onTranslationChange(e.target.value)}
        onKeyDown={(e) => props.onKeyDown(e.key)}
      />
    </div>
  );
};

export default TranslationInput;
