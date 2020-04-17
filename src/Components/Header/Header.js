import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import AppContext from "../../Context.js";
import TokenService from "../Services/token-service.js";

// Header and hamburger menu

export default class Header extends React.Component {
  static contextType = AppContext;

  state = {
    menuDisplay: false,
  };

  // handles pop out menu showing
  hamburger = () => this.setState({ menuDisplay: !this.state.menuDisplay });

  // handles log out and redirects back to login screen
  handleLogOut = (e) => {
    e.preventDefault();
    this.context.setLoggedIn(false);
    TokenService.clearAuthToken();
  };

  render() {
    return (
      <header>
        <h1>
          <Link to="/" onClick={() => this.setState({ menuDisplay: false })}>
            {" "}
            TLX
          </Link>{" "}
        </h1>

        {/*
        Creates lines for hamburger menu
        */}
        <div className="topNav">
          <div
            className={
              this.state.menuDisplay ? "hamburger change" : "hamburger"
            }
            id="menu-icon"
            type="button"
            onClick={this.hamburger}
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>

          {/*
          Items in menu
        */}
          <ol
            className={this.state.menuDisplay ? "menuItems open" : "menuItems"}
            onClick={() => this.setState({ menuDisplay: false })}
          >
            <li>
              <Link to="/Billing">Billing</Link>
            </li>
            <li>
              <Link to="/Communications">Communications</Link>
            </li>
            <li>
              <Link to="/Account">Account</Link>
            </li>

            {/*
              Conditionally renders the login and logout button in menu
            */}
            {this.context.loggedIn === true ? (
              <li>
                <p id="logButtonMenu" onClick={this.handleLogOut}>
                  <Link to="/Sign-in">Logout</Link>
                </p>
              </li>
            ) : (
              <li>
                <p id="logButtonMenu">
                  <Link to="/Sign-in">Sign In</Link>
                </p>
              </li>
            )}
          </ol>
        </div>
      </header>
    );
  }
}
