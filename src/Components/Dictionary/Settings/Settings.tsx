import React, { FC } from "react";
import { Page } from "../../Page";

interface ISettingsProps {
  title?: string;
}

const Settings: FC<ISettingsProps> = (props) => {
  return <Page title={props.title}>Settings</Page>;
};

export default Settings;
