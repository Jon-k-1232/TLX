import React from "react";
import "./SignIn.css";
import { Link } from "react-router-dom";
import config from "../../config.js";
import AppContext from "../../Context.js";

// Sign in page
export default class SignIn extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      role: ''
    };
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

change(e){
    this.setState({
      [e.target.name]: e.target.value
    })
}

submit(e){
    e.preventDefault();

    let credentials = {...this.state}

  fetch(
      `${config.API_ENDPOINT}/getToken`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Origin: `${config.FRONT_WEB}`,
        },
        body: JSON.stringify(credentials),
      }
  )
      .then((res) => {localStorage.setItem('jwt-auth', res.data)
      this.props.history.push('/Billing')})
      .catch((error) => alert(error));
}


  render() {

    return (
      <main className="signInPage">
        <div id="homePicture">
          <h2>Picture box</h2>
        </div>

        <div className="signContainer">
          <form className="signInForm" onSubmit={e => this.submit(e)}>
            <input
              id="usernameInput"
              type="text"
              name="email"
              placeholder="Username"
              maxLength="35"
              onChange={e => this.change(e)} value={this.state.email}
              required
            />

            <input
              id="passwordInput"
              type="password"
              name="password"
              placeholder="Password"
              maxLength="25"
              onChange={e => this.change(e)} value={this.state.password}
              required
            />

            <div className="newRegRegisterAs">
              <select
                name="role"
                required
                onChange={e => this.change(e)} value={this.state.role}
              >
                <option value="">Login As</option>
                <option value="tenant">Tenant</option>
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
