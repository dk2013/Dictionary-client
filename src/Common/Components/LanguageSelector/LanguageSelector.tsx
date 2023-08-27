import React, { FC } from "react";
import "./styles.scss";
import { FaArrowRight } from "react-icons/fa";

interface LanguageSelectorProps {
  onSwapLanguages: () => void;
  translateFrom: string;
  translateTo: string;
}

const LanguageSelector: FC<LanguageSelectorProps> = (props) => {
  return (
    <div className="languageSelector">
      {props.translateFrom}{" "}
      <FaArrowRight onClick={props.onSwapLanguages} className="ico" />{" "}
      {props.translateTo}
    </div>
  );
};

export default LanguageSelector;
