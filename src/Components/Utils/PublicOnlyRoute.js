import React from "react";
import { Route, Redirect } from "react-router-dom";
import TokenService from "../Services/token-service.js";

export default function PublicOnlyRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) =>
        TokenService.hasAuthToken() ? (
          <Redirect to={"/Sign-in"} />
        ) : (
          <Component {...componentProps} />
        )
      }
    />
  );
}
