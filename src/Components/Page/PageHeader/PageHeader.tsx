import React, { FC, ReactNode } from "react";
import "./styles.scss";

interface PageHeaderProps {
  children: ReactNode;
}

const PageHeader: FC<PageHeaderProps> = (props) => {
  return <h3 className="header">{props.children}</h3>;
};

export default PageHeader;
