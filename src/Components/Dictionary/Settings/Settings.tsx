import React, { FC } from "react";
import { Page } from "../../Page";

interface SettingsProps {
  title?: string;
}

const Settings: FC<SettingsProps> = (props) => {
  return <Page title={props.title}>Settings</Page>;
};

export default Settings;
