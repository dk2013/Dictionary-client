import React, { FC } from "react";
import { useAppSelector } from "../../../Hooks/store";
import { User } from "../../../Interfaces/user";

const Login: FC = () => {
  const user: User | null = useAppSelector((state) => state.user.user);

  return (
    <div>
      <span>{user?.displayName || "Guest"}</span>{" "}
      {!user ? (
        <a href={`${process.env.REACT_APP_SERVER_URL}/auth/google`}>
          Login with Google
        </a>
      ) : (
        <a href={`${process.env.REACT_APP_SERVER_URL}/auth/logout`}>Logout</a>
      )}
    </div>
  );
};

export default Login;
