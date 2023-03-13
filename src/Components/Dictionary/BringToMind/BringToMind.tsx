import { FC } from "react";
import { Page } from "../../Page";

interface BringToMindProps {
  title?: string;
}

const BringToMind: FC<BringToMindProps> = (props) => {
  return <Page title={props.title}>BringToMind</Page>;
};

export default BringToMind;
