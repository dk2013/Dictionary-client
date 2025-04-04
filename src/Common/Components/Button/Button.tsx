import React, { FC, ReactNode } from "react";

interface IButtonProps {
  children: ReactNode;
  onSave: () => void;
  disabled?: boolean;
  type?: "fancy" | "standard";
}

const Button: FC<IButtonProps> = ({
  onSave,
  children,
  type = "standard",
  disabled = false,
}) => {
  const buttonClassName =
    type === "standard" ? "btn" : "styled-btn fancy-btn btn-spacing";
  return (
    <div className="control-row centered">
      <button className={buttonClassName} onClick={onSave} disabled={disabled}>
        {children}
      </button>
    </div>
  );
};

export default Button;
