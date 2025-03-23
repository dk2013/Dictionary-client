import React, { FC } from "react";
import { FaArrowRight } from "react-icons/fa";
import styles from "./LanguageSelector.module.scss";

interface LanguageSelectorProps {
  onSwapLanguages: () => void;
  translationFrom: string;
  translationTo: string;
}

const LanguageSelector: FC<LanguageSelectorProps> = (props) => {
  return (
    <div className={styles.languageSelector}>
      {props.translationFrom}{" "}
      <FaArrowRight onClick={props.onSwapLanguages} className={styles.ico} />{" "}
      {props.translationTo}
    </div>
  );
};

export default LanguageSelector;
