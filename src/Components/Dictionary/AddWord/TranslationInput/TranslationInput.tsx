import React, { FC } from "react";

interface TranslationProps {
  value: string;
  onTranslationChange: (e: string) => void;
  onKeyDown: (key: string) => void;
}

const TranslationInput: FC<TranslationProps> = (props) => {
  return (
    <div className="control-row centered">
      <input
        className="styled-input add-word-input"
        value={props.value}
        placeholder="Enter Russian translation..."
        onChange={(e) => props.onTranslationChange(e.target.value)}
        onKeyDown={(e) => props.onKeyDown(e.key)}
      />
    </div>
  );
};

export default TranslationInput;
