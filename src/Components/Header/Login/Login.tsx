import React from "react";

const Login = ({ username = "Guest" }) => {
  return (
    <div>
      <span>{username}</span>{" "}
      <a href={`${process.env.REACT_APP_SERVER_URL}/auth/google`}>
        Login with Google
      </a>
    </div>
  );
};

export default Login;
