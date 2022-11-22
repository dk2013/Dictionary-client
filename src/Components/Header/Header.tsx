import { FC } from "react";
import { Settings } from "./Settings";
import { Nav } from "./Nav";
import "./styles.scss";

const Header: FC = () => {
  return (
    <header>
      <Nav />
      <Settings />
    </header>
  );
};
export default Header;
