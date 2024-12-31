import React, { FC } from "react";
import { useAppSelector } from "../../../Hooks/store";
import { User } from "../../../Interfaces/user";

interface LoginProps {
  username?: string;
}

const Login: FC<LoginProps> = ({ username = "Guest" }) => {
  const user: User | null = useAppSelector((state) => state.user.user);

  return (
    <div>
      <span>{user?.displayName || "Guest"}</span>{" "}
      <a href={`${process.env.REACT_APP_SERVER_URL}/auth/google`}>
        Login with Google
      </a>
    </div>
  );
};

export default Login;
