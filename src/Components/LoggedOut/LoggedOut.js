import React from "react";
import "./LoggedOut.css";
import { Link } from "react-router-dom";

// Renders on each page when the user is logged out and a user tries a route to a page

export default function LoggedOut() {
  return (
    <main className="loggedOutPage">
      <div className="loggedOutView">
        <h3>Please log into your account.</h3>
        <Link to="/">Sign In</Link>
      </div>
    </main>
  );
}
