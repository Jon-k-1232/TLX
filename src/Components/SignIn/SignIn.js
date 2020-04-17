import React from "react";
import "./SignIn.css";
import { Link } from "react-router-dom";
import AppContext from "../../Context.js";
import AuthApiService from "../Services/auth-api-service.js";
import TokenService from "../Services/token-service.js";

// Sign in page
export default class SignIn extends React.Component {
  static contextType = AppContext;

  state = {
    email: "",
    password: "",
    message: "",
  };

  // Sets state
  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // logs in
  submit(e) {
    e.preventDefault();
    this.setState({ message: "" });

    const email = this.state.email;
    const password = this.state.password;

    AuthApiService.postLogin({
      email: email,
      password: password,
    })
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
        // Manages the rendering of the login and log out in header menu
        this.context.setLoggedIn(true);
        // Sets user info so the rest of the api calls work
        this.context.setContactInfo(res.dbUser);
        this.props.history.push("/Billing");
      })
      .catch((res) => {
        this.setState({ message: res.error });
      });
  }

  render() {
    return (
      <main className="signInPage">
        <div className="signContainer">
          <form className="signInForm" onSubmit={(e) => this.submit(e)}>
            <input
              id="usernameInput"
              type="text"
              name="email"
              placeholder="Username"
              maxLength="35"
              onChange={(e) => this.change(e)}
              value={this.state.email}
              required
            />

            <input
              id="passwordInput"
              type="password"
              name="password"
              placeholder="Password"
              maxLength="25"
              onChange={(e) => this.change(e)}
              value={this.state.password}
              required
            />

            {/* Should a username a password be wrong this will render and advise the user of the error */}
            <p>{this.state.message}</p>

            <div className="buttonContainer">
              <button type="submit" id="signInButton">
                Sign Me In
              </button>
            </div>
          </form>

          <p id="signInNewUser">
            <Link to="/Register">Create a New Account</Link>
          </p>
        </div>
      </main>
    );
  }
}
