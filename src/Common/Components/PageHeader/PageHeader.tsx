import React, { FC, ReactNode } from "react";
import styles from "./PageHeader.module.scss";

interface PageHeaderProps {
  children: ReactNode;
}

const PageHeader: FC<PageHeaderProps> = (props) => {
  return <h3 className={styles.header}>{props.children}</h3>;
};

export default PageHeader;
