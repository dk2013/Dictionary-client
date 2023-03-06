import React, { FC, ReactNode } from "react";
import "./styles.scss";

interface SaveButtonProps {
  children: ReactNode;
  onSave: () => void;
}

const SaveButton: FC<SaveButtonProps> = (props) => {
  return (
    <div className="buttonContainer">
      <button onClick={props.onSave}>{props.children}</button>
    </div>
  );
};

export default SaveButton;
