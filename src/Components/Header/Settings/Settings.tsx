import { FC } from "react";
import { FaCog } from "react-icons/fa";
import "./styles.scss"
import {NavLink} from "react-router-dom";

const Settings: FC = () => {
  return (
    <>
      <NavLink to="/settings"><FaCog className="cogIco" /></NavLink>

    </>
  );
};

export default Settings;
