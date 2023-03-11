import { FC } from "react";
import { Page } from "../../Page";

interface GetToKnowProps {
  title?: string;
}

const GetToKnow: FC<GetToKnowProps> = (props) => {
  return <Page title={props.title}>GetToKnow</Page>;
};

export default GetToKnow;
