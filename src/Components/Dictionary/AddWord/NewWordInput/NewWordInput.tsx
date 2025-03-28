import React, { FC } from "react";

interface NewWordInputProps {
  value: string;
  placeholder: string;
  onNewWordChange: (e: string) => void;
  onKeyDown: (key: string) => void;
}

const NewWordInput: FC<NewWordInputProps> = ({
  value,
  placeholder,
  onNewWordChange,
  onKeyDown,
}) => {
  return (
    <div className="control-row centered">
      <input
        className="styled-input add-word-input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onNewWordChange(e.target.value)}
        onKeyDown={(e) => onKeyDown(e.key)}
      />
    </div>
  );
};

export default NewWordInput;
