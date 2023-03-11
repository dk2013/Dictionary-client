import { FC } from "react";
import { Page } from "../../Page";

interface ExamProps {
  title?: string;
}

const Exam: FC<ExamProps> = (props) => {
  return <Page title={props.title}>Exam</Page>;
};

export default Exam;
