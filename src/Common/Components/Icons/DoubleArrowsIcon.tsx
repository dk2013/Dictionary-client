import doubleArrowsIcon from "../../../Assets/Images/double-arrows.svg";
import React, { FC } from "react";
import { sortOrders } from "../../../Components/Dictionary/BringToMind/TranslationTable/TranslationTable";

interface DoubleArrowsIconProps {
  orderBy: sortOrders;
}

const DoubleArrowsIcon: FC<DoubleArrowsIconProps> = ({ orderBy }) => {
  const rotate = orderBy === sortOrders.ASC ? 90 : -90;

  return (
    <img
      className="sort-arrow"
      style={{
        transform: `rotate(${rotate}deg)`,
      }}
      src={doubleArrowsIcon}
      alt="Sort"
      width="24"
      height="24"
    />
  );
};

export default DoubleArrowsIcon;
