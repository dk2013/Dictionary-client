import React, { FC, ReactNode } from "react";
import "./styles.scss";

interface SaveButtonProps {
  children: ReactNode;
  onSave: () => void;
  disabled?: boolean;
}

const SaveButton: FC<SaveButtonProps> = ({
  onSave,
  children,
  disabled = false,
}) => {
  return (
    <div className="buttonContainer">
      <button onClick={onSave} disabled={disabled}>
        {children}
      </button>
    </div>
  );
};

export default SaveButton;
