import { FC } from "react";
import { Settings } from "./Settings";
import { Nav } from "./Nav";
import { Login } from "./Login";
import "./styles.scss";

const Header: FC = () => {
  return (
    <header>
      <Nav />
      <Login />
      <Settings />
    </header>
  );
};
export default Header;
