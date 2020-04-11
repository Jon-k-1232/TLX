import React from "react";
import "./Account.css";
import AppContext from "../../Context.js";
import config from "../../config.js";

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
  };

  componentDidMount() {
    // Gets user contact info along with linked property manager
    fetch(`${config.API_ENDPOINT}/contacts/data/2`, {
      //--- 2 needs updated to ${this.props.match.params.id} once login done
      method: "GET",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.status);
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

    fetch(
      `${config.API_ENDPOINT}/contacts/data/${this.context.contactInfo.userid}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Origin: `${config.FRONT_WEB}`,
        },
        body: JSON.stringify(updateCntct),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        alert("Contact information changed successfully");
      })
      .catch((error) => alert(error));
  };

  // handles submit for password
  handleSubmitPassword(e) {
    e.preventDefault();
    const newPassword = { password: this.state.password };

    fetch(`${config.API_ENDPOINT}/amend/${this.context.contactInfo.userid}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Origin: `${config.FRONT_WEB}`,
      },
      body: JSON.stringify(newPassword),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Password changed successfully");
      })
      .catch((error) => alert(error));
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
        <h1>Account</h1>

        <div className="accountPassword">
          <h3>Change Password</h3>
          <form onSubmit={(e) => this.handleSubmitPassword(e)}>
            <input
              id="changePassword"
              type="text"
              name="password"
              placeholder="Password"
              maxLength="25"
              onChange={(e) => this.change(e)}
              value={this.state.password}
              required
            />
            <button type="submit">Save</button>
          </form>
        </div>

        <div className="accountContact">
          <h3>Contact information</h3>

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

        <div className="accountAddress">
          <h3>Update your contact information</h3>
          <form
            className="contactInformation"
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              maxLength="35"
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
              maxLength="6"
              onChange={(e) => this.change(e)}
              value={this.state.zip}
              required
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              maxLength="35"
              onChange={(e) => this.change(e)}
              value={this.state.email}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              maxLength="14"
              onChange={(e) => this.change(e)}
              value={this.state.phone}
              required
            />
            <div className="buttonContainer">
              <button type="submit">Save</button>
            </div>
          </form>
        </div>

        <div className="accountPropManager">
          <h3>Property Manager:</h3>
          <p>{this.context.contactInfo.managerName}</p>
        </div>
      </main>
    );
  }
}
