import React, { FC } from "react";
import { FaArrowRight } from "react-icons/fa";
import styles from "./LanguageSelector.module.scss";
import classNames from "classnames";

interface ILanguageSelectorProps {
  onSwapLanguages: () => void;
  translationFrom: string;
  translationTo: string;
  disabled?: boolean;
}

const LanguageSelector: FC<ILanguageSelectorProps> = (props) => {
  // const disabled = props.disabled;
  const handleSwapLanguages = () => {
    if (props.disabled) {
      return;
    }
    props.onSwapLanguages();
  };

  return (
    <div
      className={classNames(
        styles.languageSelector,
        props.disabled ? styles.disabled : null
      )}
    >
      {props.translationFrom}{" "}
      <FaArrowRight onClick={handleSwapLanguages} className={styles.ico} />{" "}
      {props.translationTo}
    </div>
  );
};

export default LanguageSelector;
