import React from "react";
import "./Account.css";
import account from "../Images/account.png";
import TokenService from "../Services/token-service.js";
import AppContext from "../../Context.js";
import config from "../../config.js";
import UserService from "../Services/user-service.js";

// User account page

export default class Account extends React.Component {
  static contextType = AppContext;

  state = {
    company: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    checkMessage: "",
  };

  componentDidMount() {
    // Gets user contact info along with linked property manager

    fetch(`${config.API_ENDPOINT}/contacts/${UserService.getUserId()}`, {
      method: "GET",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
        Origin: `${config.FRONT_WEB}`,
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          this.context.setReset();
          TokenService.clearAuthToken();
          UserService.clearUserId();
          this.props.history.push("/");
          alert(`Your session has expired, please login.`);
        }
        return resp.json();
      })
      .then((data) => {
        this.context.setContactInfo(data.userContactInfo[0]);
        this.context.setManagerInfo(data.userManagerInfo[0]);
      })
      .catch((error) => {
        alert(error);
      });
  }

  /*
  If demo account (user 2) than will stop submit and disallow.
  This is needed so other users can view demo version.
  If a demo user were to change the email or password it would lock other users out of the demo.
  This is also validated on backend however since the api call updates user info, and the endpoint on the backend
   would be blocked, the user would be presented an error.
  */
  checkDemo = (e) => {
    e.preventDefault();
    if(`${UserService.getUserId()}` === '2'){
      alert("Sorry, for demonstration purposes you are unable to update user information on" +
          " this account. For non-demonstration accounts user information will be updated.")
    }else{
      // continues to update the user information
      this.handleSubmit(e)
    }
  }

  // handles submit for contact info update
  handleSubmit = (e) => {
    e.preventDefault();

    const updateCntct = {
      company: this.state.company,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      email: this.state.email,
      phone: this.state.phone,
    };

    /*
    This will allow either the user to stay logged in if the email is not changed or automatically be logged
    out if the email is changed.
     */
    if (this.context.contactInfo.email === this.state.email) {
      fetch(`${config.API_ENDPOINT}/contacts/${UserService.getUserId()}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${TokenService.getAuthToken()}`,
          Origin: `${config.FRONT_WEB}`,
        },
        body: JSON.stringify(updateCntct),
      })
        .then((res) => res.json())
        .then((res) => {
          alert(res.message);
          this.context.setContactInfo(res.userContactInfo[0]);
        })
        .catch((error) => alert(error));
    } else {
      fetch(`${config.API_ENDPOINT}/contacts/${UserService.getUserId()}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${TokenService.getAuthToken()}`,
          Origin: `${config.FRONT_WEB}`,
        },
        body: JSON.stringify(updateCntct),
      })
        .then((res) => res.json())
        .then((res) => {
          alert(
            "Contact information changed successfully. You have now been logged out."
          );
          this.props.history.push("/Sign-in");
          TokenService.clearAuthToken();
          UserService.clearUserId();
        })
        .catch((error) => alert(error));
    }
  };

  // handles submit for password with password validation. Demo user validation on backend.
  handleSubmitPassword(e) {
    e.preventDefault();

    let newPassword = "";
    let tempPassword = this.state.password;
    let confirmPassword = this.state.confirmPassword;

    if (tempPassword === confirmPassword) {
      newPassword = { password: tempPassword };

      fetch(`${config.API_ENDPOINT}/contacts/pass/${UserService.getUserId()}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${TokenService.getAuthToken()}`,
          Origin: `${config.FRONT_WEB}`,
        },
        body: JSON.stringify(newPassword),
      })
        .then((res) => res.json())
        .then((res) => {
          alert(res.message);
          this.setState({ checkMessage: "" });
        })
        .catch((error) => alert(error));
    } else {
      // password validation
      this.setState({ checkMessage: "Password does not match" });
    }
  }

  // updates the input state
  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    let contactInfo = this.context.contactInfo;

    return (
      <main className="accountPage">
        <div className="accountIcon">
          <img src={account} alt="account icon" />
          <h2>Account</h2>
        </div>

        <div className="contactBlock">
          <div className="accountContact">
            <h3>Contact information</h3>

            <div>
              <div className="contactCompanyName">
                <h5>Company: </h5>
                <div>
                  <p>{contactInfo.company}</p>
                </div>
              </div>

              <div className="contactAddress">
                <h5>Address: </h5>
                <div>
                  <p>{contactInfo.street}</p> <br />
                  <p>
                    {contactInfo.city}, {contactInfo.state} {contactInfo.zip}
                  </p>
                </div>
              </div>

              <div className="contactPhone">
                <h5>Phone: </h5>
                <div>
                  <p>{contactInfo.phone}</p>
                </div>
              </div>

              <div className="contactEmail">
                <h5>Email: </h5>
                <div>
                  <p>{contactInfo.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="accountAddress">
            <h3>Update your contact information</h3>
            <form
              className="contactInformation"
              onSubmit={(e) => this.checkDemo(e)}
            >
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                maxLength="40"
                onChange={(e) => this.change(e)}
                value={this.state.company}
                required
              />
              <input
                type="text"
                name="street"
                maxLength="45"
                placeholder="Street Address"
                onChange={(e) => this.change(e)}
                value={this.state.street}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                minLength="3"
                maxLength="25"
                onChange={(e) => this.change(e)}
                value={this.state.city}
                required
              />
              <select
                name="state"
                id="state"
                onChange={(e) => this.change(e)}
                value={this.state.state}
                required
              >
                <option value="">Select a State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>

              <input
                type="text"
                name="zip"
                placeholder="Zip"
                maxLength="5"
                onChange={(e) => this.change(e)}
                value={this.state.zip}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                maxLength="45"
                onChange={(e) => this.change(e)}
                value={this.state.email}
                required
              />
              <input
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                name="phone"
                minLength="12"
                maxLength="12"
                placeholder="Phone"
                onChange={(e) => this.change(e)}
                value={this.state.phone}
                required
              />
              <div className="emailAlert">
                <p id="emailWarn">
                  * You will be logged out should your email be changed.
                </p>
              </div>
              <div className="infoButtonContainer">
                <button id="updateContactButton" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="passManager">
          <div className="accountPassword">
            <h3>Change Password</h3>
            <form onSubmit={(e) => this.handleSubmitPassword(e)}>
              <div>
                <p>{this.state.checkMessage}</p>
                <input
                  id="changePassword"
                  type="text"
                  name="password"
                  placeholder="8 Character Minimum"
                  minLength="8"
                  maxLength="25"
                  onChange={(e) => this.change(e)}
                  value={this.state.password}
                  required
                />
              </div>

              <div>
                <input
                  id="confirmPassword"
                  type="text"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  minLength="8"
                  maxLength="25"
                  onChange={(e) => this.change(e)}
                  value={this.state.confirmPassword}
                  required
                />
              </div>
              <div className="updtPasswordButtonContainer">
                <button id="updatePasswordButton" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>

          <div className="accountPropManager">
            <h3>Property Manager:</h3>
            <p>{this.context.contactInfo.managerName}</p>
          </div>
        </div>
      </main>
    );
  }
}
