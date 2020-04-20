import React from "react";
import {useHistory} from "react-router-dom";
import userAuth from "../utils/userAuth";
import Login from "../pages/Login";

function LoginButton() {
  let history = useHistory();

  return userAuth.isAuthenticated ? (
    <p>
      <button
        onClick={() => {
          userAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
    ) : (
      <p>
        <button        
          onClick={() => {
          // userAuth.signout(() => history.push("/login"));
          history.push("/login");
        }}>
          Login
        </button>
      </p>
  );
};

export default LoginButton;