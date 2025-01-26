import React, { useState } from "react";
import { Header } from "./Header";
import { Nav } from "./Nav";

const HeaderAndNav = () => {
  const [appMenuActive, setAppMenuActive] = useState(false);
  const [profileMenuActive, setProfileMenuActive] = useState(false);

  return (
    <>
      <Header
        onAppMenuClick={() => setAppMenuActive(!appMenuActive)}
        onProfileMenuClick={() => setProfileMenuActive(!profileMenuActive)}
      />
      <Nav
        appMenuActive={appMenuActive}
        onAppMenuClick={() => setAppMenuActive(!appMenuActive)}
        profileMenuActive={profileMenuActive}
        onProfileMenuClick={() => setProfileMenuActive(!profileMenuActive)}
      />
    </>
  );
};

export default HeaderAndNav;
