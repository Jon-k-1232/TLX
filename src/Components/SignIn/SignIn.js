import React from "react";
import "./SignIn.css";
import { Link } from "react-router-dom";
import AppContext from "../../Context.js";


export default class SignIn extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      type: null,
    };
  }

  updateSignInUser = user => {
    this.setState({
      username: user,
      password: this.state.password,
      type: this.state.type,
    });
  };

  updateSignInPassword = password => {
    this.setState({
      username: this.state.user,
      password: password,
      type: this.state.type,
    });
  };

  updateSignInType= type => {
    this.setState({
      username: this.state.user,
      password: this.state.password,
      type: type,
    });
  };

  handleSubmit = (e, newUser) => {
    e.preventDefault();
    this.context.setUser({ ...this.state });
    this.props.history.push('/Billing')
  };

  render() {
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
              onChange={e => this.updateSignInUser(e.target.value)}
              required
            />

            <input
              id="passwordInput"
              type="text"
              placeholder="Password"
              onChange={e => this.updateSignInPassword(e.target.value)}
              required
            />

            <div className='newRegRegisterAs'>
              <select
                  name='registerOption'
                  required
                  onChange={e => this.updateSignInType(e.target.value)}
              >
                <option value="">Tenant/ Property Manager</option>
                <option value="Tenant">Tenant</option>
                <option value="Property Manager">Property Manager</option>
              </select>
            </div>

            <div className='buttonContainer'>
                <button type="submit" id="signInButton">SIGN ME IN</button>
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
