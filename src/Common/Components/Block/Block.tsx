import React, { FC, ReactNode } from "react";
import styles from "./Block.module.scss";
import classNames from "classnames";

interface IBlockProps {
  children: ReactNode;
  extraContainerClassName?: string;
}

const Block: FC<IBlockProps> = ({ children, extraContainerClassName = "" }) => {
  return (
    <div
      className={classNames(styles.container, styles[extraContainerClassName])}
    >
      {children}
    </div>
  );
};

export default Block;
