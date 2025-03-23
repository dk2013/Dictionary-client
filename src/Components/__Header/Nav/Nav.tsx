import { FC, useState } from "react";
// import { routes } from "../../../Router/routes";
import { NavLink } from "react-router-dom";
import "./Header.module.scss";
import { IRoute } from "../../../Types/route";

interface INavProps {
  routes: IRoute[];
}

const Nav: FC<INavProps> = ({ routes }) => {
  const [menuActive, setMenuActive] = useState(false);
  return (
    <>
      <div
        className="burgerMenuButton"
        onClick={() => setMenuActive(!menuActive)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      {menuActive && (
        <nav>
          {routes.length && (
            <ul>
              {routes.map((route) => {
                return (
                  <li key={route.name}>
                    <NavLink
                      to={route.path}
                      onClick={() => setMenuActive(!menuActive)}
                    >
                      {route.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>
      )}
    </>
  );
};

export default Nav;
