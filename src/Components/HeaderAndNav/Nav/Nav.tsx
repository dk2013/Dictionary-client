import React, { FC } from "react";
import { NavMenu } from "./NavMenu";
import { appRoutes, profileRoutes } from "../../../Router/routes";

interface INavProps {
  appMenuActive: boolean;
  onAppMenuClick: () => void;
  profileMenuActive: boolean;
  onProfileMenuClick: () => void;
}

const Nav: FC<INavProps> = (props) => {
  return (
    <>
      <NavMenu
        menuActive={props.appMenuActive}
        onMenuClick={props.onAppMenuClick}
        position={"left"}
        routes={appRoutes}
      />
      <NavMenu
        menuActive={props.profileMenuActive}
        onMenuClick={props.onProfileMenuClick}
        position={"right"}
        routes={profileRoutes}
      />
    </>
  );
};

export default Nav;
