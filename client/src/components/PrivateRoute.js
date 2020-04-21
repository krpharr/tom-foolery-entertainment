import React from "react";
import {Route, Redirect} from "react-router-dom";
import userAuth from "../utils/userAuth";

function PrivateRoute({ children, ...rest }) {
  // console.log(children);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userAuth.isAuthenticated && userAuth.user.type === children.props.type ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;