import { FC, useState } from "react";
import { Page } from "../../Page";
import { LanguageSelector } from "../../../Common/Components/LanguageSelector";
import classNames from "classnames";
import styles from "./Exam.module.scss";
import { languageCodes } from "../../../Common/Constants/dictionary";

interface IExamProps {
  title?: string;
  translationFrom: string;
  translationTo: string;
  changeTranslateFrom: (v: string) => void;
  changeTranslationTo: (v: string) => void;
}

interface ITestState {
  translationFrom: string;
  translationTo: string;
  started: boolean;
  startedAt: Date | null;
}

const defaultTestState: ITestState = {
  translationFrom: languageCodes.ENG,
  translationTo: languageCodes.RUS,
  started: false,
  startedAt: null,
};

const Exam: FC<IExamProps> = (props) => {
  const [testState, setTestState] = useState<ITestState>(defaultTestState);

  const handleSwapLanguages = () => {
    const newTranslationTo = props.translationFrom;
    const newTranslateFrom = props.translationTo;

    props.changeTranslateFrom(newTranslateFrom);
    props.changeTranslationTo(newTranslationTo);
  };

  return (
    <Page title={props.title}>
      <div className={classNames(styles.contentTitle)}>Check Yourself</div>
      <p className={classNames(styles.contentDescription)}>
        Test your vocabulary and strengthen your memory by learning new words.
        Try to beat your high score!
      </p>
      <LanguageSelector
        translationFrom={props.translationFrom}
        translationTo={props.translationTo}
        onSwapLanguages={handleSwapLanguages}
      />
      <button className="styled-btn fancy-btn width-80">Start test</button>
    </Page>
  );
};

export default Exam;
