import React, { FC, ReactNode } from "react";
import "./styles.scss";

interface ButtonProps {
  children: ReactNode;
  onSave: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
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

export default Button;
