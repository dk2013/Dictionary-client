import doubleArrowsIcon from "../../../Assets/Images/double-arrows.svg";
import React, { FC } from "react";
import { sortOrders } from "../../../Components/Dictionary/BringToMind/TranslationTable/TranslationTable";
import styles from "./DoubleArrowsIcon.module.scss";

interface DoubleArrowsIconProps {
  orderBy: sortOrders;
}

const DoubleArrowsIcon: FC<DoubleArrowsIconProps> = ({ orderBy }) => {
  const rotate = orderBy === sortOrders.ASC ? 90 : -90;

  return (
    <img
      className={styles.sortArrow}
      style={{
        transform: `rotate(${rotate}deg)`,
      }}
      src={doubleArrowsIcon}
      alt="Sort Direction"
      width="24"
      height="24"
    />
  );
};

export default DoubleArrowsIcon;
