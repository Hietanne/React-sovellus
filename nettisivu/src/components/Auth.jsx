import React from "react";
import Register from "./register";
import Login from "./login";
import "../styles/auth.css";

const Auth = () => {
  return (
    <div className="auth-container">
      <Login />
      <Register />
    </div>
  );
};

export default Auth;