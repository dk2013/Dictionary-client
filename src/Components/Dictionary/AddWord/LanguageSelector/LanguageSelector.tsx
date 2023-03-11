import React, { FC } from "react";
import "./styles.scss";
import { FaArrowRight } from "react-icons/fa";
import { languageCodes } from "../../Dictionary";

interface LanguageSelectorProps {
  onSwapLanguages: () => void;
  translateFrom: languageCodes;
  translateTo: languageCodes;
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
