import { IRoute } from "../Types/route";

export const appRoutes: IRoute[] = [
  {
    path: "/",
    name: "Dashboard",
  },
  {
    path: "/add-word",
    name: "Add Word",
  },
  {
    path: "/bring-to-mind",
    name: "Bring To Mind",
  },
  {
    path: "/exam",
    name: "Check Yourself",
  },
];

export const profileRoutes: IRoute[] = [
  {
    path: "/settings",
    name: "Settings",
  },
  {
    path: `${process.env.REACT_APP_SERVER_URL}/auth/google`,
    name: "Login",
    external: true,
  },
  {
    path: `${process.env.REACT_APP_SERVER_URL}/auth/logout`,
    name: "Logout",
    external: true,
  },
];
