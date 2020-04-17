import React from "react";
import { Route, Redirect } from "react-router-dom";
import TokenService from "../Services/token-service.js";

export default function PrivateRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) =>
        TokenService.hasAuthToken() ? (
          <Component {...componentProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/Sign-in",
              state: { from: componentProps.location },
            }}
          />
        )
      }
    />
  );
}
