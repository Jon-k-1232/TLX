import React from "react";
import "./Account.css";

export default class Billing extends React.Component {
  render() {
    return (
      <main className="accountPage">
        <h1>Account</h1>

        <div className="accountUsername">
          <h3>Change Username</h3>
          <form>
            <input
              id="username Display"
              type="text"
              placeholder="Username"
              required
            />
          </form>
          <button>Save</button>
        </div>

        <div className="accountPassword">
          <h3>Change Password</h3>
          <form>
            <input
              id="changePassword"
              type="text"
              placeholder="Password"
              required
            />
          </form>
          <button>Save</button>
        </div>

        <div className="accountAddress">
          <h3>Your contact information</h3>
          <form className="contactInformation">
            <input type="text" placeholder="Company Name" required />
            <input type="text" placeholder="Street Address" required />
            <input type="text" placeholder="City" required />
            <select name="state" id="state">
              <option value="">
                Select a State
              </option>
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
            <input type="text" placeholder="Zip" required />
            <input type="text" placeholder="Email" required />
            <input type="text" placeholder="Phone" required />
          </form>
          <button>Save</button>
        </div>

        <div className="accountPropManager">
          <h3>Property Manager:</h3>
          <p>ABC Management</p>
        </div>
      </main>
    );
  }
}
