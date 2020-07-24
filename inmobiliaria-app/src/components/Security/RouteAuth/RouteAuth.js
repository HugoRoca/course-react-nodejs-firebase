import { Route, Redirect } from "react-router-dom";
import React from "react";
import { useStateValue } from "../../../session/store";

function RouteAuth({ component: Component, authenticateFirebase, ...rest }) {
  const [{ authenticate }, dispatch] = useStateValue();

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticate || authenticateFirebase !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
}

export default RouteAuth;
