import React, { FC } from "react";
import { IRoute } from "../../../../Types/route";
import { NavLink } from "react-router-dom";
import { User } from "../../../../Types/user";
import { useAppSelector } from "../../../../Hooks/store";

interface NavMenuProps {
  menuActive: boolean;
  onMenuClick: () => void;
  position: "left" | "right";
  routes: IRoute[];
}

const NavMenu: FC<NavMenuProps> = ({
  menuActive,
  onMenuClick,
  position,
  routes,
}) => {
  const user: User | null = useAppSelector((state) => state.user.user);
  const navId = `side-menu-${position}`;
  const navClass = menuActive ? "side-menu active" : "side-menu";

  routes = !user
    ? routes.filter((route) => route.name !== "Logout")
    : routes.filter((route) => route.name !== "Login");

  return (
    <nav id={navId} className={navClass}>
      <ul>
        {routes.map((route) => {
          return (
            <li key={route.name}>
              {route.external ? (
                <a href={route.path} rel="noopener noreferrer">
                  {route.name}
                </a>
              ) : (
                <NavLink
                  to={route.path}
                  rel="noopener noreferrer"
                  onClick={() => onMenuClick()}
                >
                  {route.name}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavMenu;
