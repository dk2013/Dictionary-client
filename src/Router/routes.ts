import { IRoute } from "../Types/route";
import { ENV, envs } from "../Common/Constants/global";

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
];
if (ENV !== envs.PROD) {
  appRoutes.push({
    path: "/exam",
    name: "Check Yourself",
  });
}

export const profileRoutes: IRoute[] = [
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
if (ENV !== envs.PROD) {
  profileRoutes.unshift({
    path: "/settings",
    name: "Settings",
  });
}
