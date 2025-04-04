import React, { FC } from "react";

interface ITranslationProps {
  value: string;
  placeholder: string;
  onTranslationChange: (e: string) => void;
  onKeyDown: (key: string) => void;
}

const TranslationInput: FC<ITranslationProps> = ({
  value,
  placeholder,
  onTranslationChange,
  onKeyDown,
}) => {
  return (
    <div className="control-row centered">
      <input
        className="styled-input add-word-input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onTranslationChange(e.target.value)}
        onKeyDown={(e) => onKeyDown(e.key)}
      />
    </div>
  );
};

export default TranslationInput;
