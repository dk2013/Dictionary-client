import React, { FC } from "react";
import "./styles.scss";
import { languageCodes } from "../../../../../Common/Constants/dictionary";

interface ColumnHeaderProps {
  position: "left" | "right";
  language: languageCodes;
}

const ColumnHeader: FC<ColumnHeaderProps> = ({ position, language }) => {
  return (
    <div className="columnContainer">
      <h4>{language}</h4>
      <div>
        <button>hide</button>
        <button>sort by name ⬇️</button>
      </div>
    </div>
  );
};

export default ColumnHeader;
