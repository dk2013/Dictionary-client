import React from "react";
import "./styles.scss";
import { FaArrowRight } from "react-icons/fa";

const LanguageSelector = () => {
  return (
    <div className="languageSelector">
      Eng <FaArrowRight className="ico" /> Rus
    </div>
  );
};

export default LanguageSelector;
