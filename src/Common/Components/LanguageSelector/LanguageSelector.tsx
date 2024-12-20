import React, { FC } from "react";
import "./styles.scss";
import { FaArrowRight } from "react-icons/fa";

interface LanguageSelectorProps {
  onSwapLanguages: () => void;
  translationFrom: string;
  translationTo: string;
}

const LanguageSelector: FC<LanguageSelectorProps> = (props) => {
  return (
    <div className="languageSelector">
      {props.translationFrom}{" "}
      <FaArrowRight onClick={props.onSwapLanguages} className="ico" />{" "}
      {props.translationTo}
    </div>
  );
};

export default LanguageSelector;
