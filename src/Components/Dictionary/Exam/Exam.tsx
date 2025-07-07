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

interface IExamState {
  translationFrom: string;
  translationTo: string;
  started: boolean;
  startedAt: number | null;
}

const defaultExamState: IExamState = {
  translationFrom: languageCodes.ENG,
  translationTo: languageCodes.RUS,
  started: false,
  startedAt: null,
};

const Exam: FC<IExamProps> = (props) => {
  const [examState, setExamState] = useState<IExamState>(defaultExamState);

  const handleSwapLanguages = () => {
    const newTranslationTo = props.translationFrom;
    const newTranslateFrom = props.translationTo;

    props.changeTranslateFrom(newTranslateFrom);
    props.changeTranslationTo(newTranslationTo);
  };

  const handleStartExam = () => {
    setExamState((prev) => ({ ...prev, started: true, startedAt: Date.now() }));

    console.log(examState);
  };

  const handleStopExam = () => {
    setExamState((prev) => ({ ...prev, started: false, startedAt: null }));
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
        disabled={examState.started}
      />
      {examState.started || (
        <button
          className="styled-btn fancy-btn width-80"
          onClick={handleStartExam}
        >
          Start Exam
        </button>
      )}
      {!examState.started || (
        <button
          className="styled-btn fancy-btn width-80"
          onClick={handleStopExam}
        >
          Stop Exam
        </button>
      )}
    </Page>
  );
};

export default Exam;
