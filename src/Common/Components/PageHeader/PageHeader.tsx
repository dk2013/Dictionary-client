import React, { FC, ReactNode } from "react";
import styles from "./PageHeader.module.scss";

interface IPageHeaderProps {
  children: ReactNode;
}

const PageHeader: FC<IPageHeaderProps> = (props) => {
  return <h3 className={styles.header}>{props.children}</h3>;
};

export default PageHeader;
