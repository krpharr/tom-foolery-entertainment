import React from "react";
import {useHistory} from "react-router-dom";
import userAuth from "../utils/userAuth";

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
          history.push("/login");
        }}>
          Login
        </button>
      </p>
  );
};

export default LoginButton;