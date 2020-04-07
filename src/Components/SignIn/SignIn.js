import React from "react";
import "./SignIn.css";
import { Link } from "react-router-dom";
import AppContext from "../../Context.js";

// Sign in page
export default class SignIn extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      username: null,
      password: null,
      type: null
    };
  }

  updateSignInUser = (user, loginData) => {
    this.setState({
      userId: loginData.userId,
      username: user
    });
  };

  updateSignInPassword = password => {
    this.setState({
      password: password
    });
  };

  updateSignInType = type => {
    this.setState({
      type: type
    });
  };

  handleSubmit = (e, newUser) => {
    e.preventDefault();
    this.context.setUser({ ...this.state });
    this.props.history.push("/Billing");
  };

  render() {
    const loginData = this.context.contactInfo;

    return (
      <main className="signInPage">
        <div id="homePicture">
          <h2>Picture box</h2>
        </div>

        <div className="signContainer">
          <form className="signInForm" onSubmit={this.handleSubmit}>
            <input
              id="usernameInput"
              type="text"
              placeholder="Username"
              maxLength="35"
              onChange={e => this.updateSignInUser(e.target.value, loginData)}
              required
            />

            <input
              id="passwordInput"
              type="text"
              placeholder="Password"
              maxLength="25"
              onChange={e =>
                this.updateSignInPassword(e.target.value, loginData)
              }
              required
            />

            <div className="newRegRegisterAs">
              <select
                name="registerOption"
                required
                onChange={e => this.updateSignInType(e.target.value, loginData)}
              >
                <option value="">Login As</option>
                <option value="Tenant">Tenant</option>
              </select>
            </div>

            <div className="buttonContainer">
              <button type="submit" id="signInButton">
                Sign Me In
              </button>
            </div>
          </form>

          <p id="signInNewUser">
            <Link to="/register">Create a New Account</Link>
          </p>
        </div>
      </main>
    );
  }
}
