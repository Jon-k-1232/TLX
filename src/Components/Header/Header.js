import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import AppContext from "../../Context.js";

export default class Header extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: null,
        password: null,
        type: null,
        },
      menuDisplay: false,
    };
  }

  // handles pop out menu showing
  hamburger = () => this.setState({ menuDisplay: !this.state.menuDisplay });

  // handles log out and redirects back to login screen
  handleLogOut = e => {
    e.preventDefault();
    this.context.setUser({...this.state.user});
  };


  render() {
    return (
      <header>
        <h1>
          <Link
              to="/"
              onClick={() => this.setState({ menuDisplay: false })}
          > TLX
          </Link>{" "}
        </h1>
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

            {this.context.user.type === "Tenant" ? (
            <li>
              <button onClick={this.handleLogOut}><Link to='/'>Logout</Link></button>
            </li>
            ) :
                <li>
                  <button><Link to='/'>Sign In</Link></button>
                </li>
            }
          </ol>
        </div>
      </header>
    );
  }
}
