import React from "react";

const Login = ({ username = "Guest" }) => {
  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

  return (
    <div>
      <span>{username}</span>{" "}
      <a href={`${REACT_APP_SERVER_URL}/auth/google`}>Login with Google</a>
    </div>
  );
};

export default Login;
