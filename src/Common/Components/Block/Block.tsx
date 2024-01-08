import React, { FC, ReactNode } from "react";
import "./styles.scss";

interface BlockProps {
  children: ReactNode;
  extraContainerClassName?: string;
}

const Block: FC<BlockProps> = (props) => {
  return (
    <div className={`container ${props.extraContainerClassName}`}>
      {props.children}
    </div>
  );
};

export default Block;
