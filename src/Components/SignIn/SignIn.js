import React from "react";
import "./SignIn.css";
import { Link } from "react-router-dom";
import AppContext from "../../Context.js";
import AuthApiService from "../Services/auth-api-service.js";
import TokenService from "../Services/token-service.js";
import UserService from "../Services/user-service.js";

// Sign in page
export default class SignIn extends React.Component {
  static contextType = AppContext;

  state = {
    email: "",
    password: "",
    message: "",
    demoMode: false,
    demoUser: "Bob@BobTheBuilder.com",
    demoPassword: "testtest",
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
        // Sets user info so the rest of the api calls work
        UserService.saveUserId(res.dbUser.userid, res.dbUser.company);
        this.props.history.push("/Billing");
      })
      .catch((res) => {
        this.setState({ message: res.error });
      });
  }

  // Add'd to toggle the demo mode on and off and will prefill demo account information.
  demo = (e) =>{
    e.preventDefault();
    if(this.state.demoMode === false){
      this.setState({demoMode: true})
      this.setState({email:'Bob@BobTheBuilder.com', password:'testtest'})
    }else{
      this.setState({demoMode: false})
      this.setState({email:'', password:''})
    }
  }

  render() {
    return (
      <main className="signInPage">
        <div className="signContainer">

          {this.state.demoMode === false ? (
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

          ):(
              <form className="signInForm" onSubmit={(e) => this.submit(e)}>
                <input
                    id="usernameInput"
                    type="text"
                    name="email"
                    placeholder={this.state.demoUser}
                    maxLength="35"
                    value={this.state.demoUser}
                    required
                />

                <input
                    id="passwordInput"
                    type="password"
                    name="password"
                    placeholder={this.state.demoPassword}
                    maxLength="25"
                    value={this.state.demoPassword}
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

          )}

          <p id="signInNewUser">
            <Link to="/Register">Create a New Account</Link>
          </p>

          {/* Demo Mode will toggle and let user know if they are in demo mode or not. */}
          <p id="demoToggle" onClick={(e) => this.demo(e)}>
            {this.state.demoMode === false ? ('Demo Mode Off') : ('Demo Mode On')}
          </p>

        </div>
      </main>
    );
  }
}
