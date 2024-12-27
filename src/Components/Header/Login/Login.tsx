import React from "react";

const Login = ({ username = "Guest" }) => {
  const serverURL = process.env.REACT_APP_SERVER_URL;

  return (
    <div>
      <span>{username}</span>{" "}
      <a href={`${serverURL}/auth/google`}>Login with Google</a>
    </div>
  );
};

export default Login;
