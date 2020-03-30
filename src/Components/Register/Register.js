import React from "react";
import "./Register.css";
import AppContext from "../../Context.js";

export default class Register extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      company: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      email: "",
      phone: "",
      role: ""
    };
  }

  updateLogin = Login => {
    this.setState({
      Login: Login
    });
  };

  updatePassword = password => {
    this.setState({
      password: password
    });
  };

  updateCompany = company => {
    this.setState({
      userId: "blkjsbdlvjbio334f",
      company: company
    });
  };

  updateStreet = street => {
    this.setState({
      street: street
    });
  };

  updateCity = city => {
    this.setState({
      city: city
    });
  };

  updateState = state => {
    this.setState({
      state: state
    });
  };

  updateZip = zip => {
    this.setState({
      zip: zip
    });
  };

  updatePhone = phone => {
    this.setState({
      phone: phone
    });
  };

  updateRole = role => {
    this.setState({
      role: role
    });
  };

  handleSubmit = (e, newUser) => {
    e.preventDefault();
    this.context.setContactInfo({ ...this.state });
    this.props.history.push("/");
  };

  render() {
    return (
      <main className="RegisterPage">
        <h2>Create a TLX Account</h2>

        <form onSubmit={this.handleSubmit}>
          <div className="newRegUserName">
            <label>Log In E-mail:</label>
            <div>
              <input
                type="text"
                onChange={e => this.updateLogin(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="newRegUserpassword">
            <label>Password:</label>
            <div>
              <input
                type="text"
                onChange={e => this.updatePassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="newRegCompany">
            <label>Company Name:</label>
            <div>
              <input
                type="text"
                onChange={e => this.updateCompany(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="newRegStreet">
            <label>Street:</label>
            <div>
              <input
                type="text"
                onChange={e => this.updateStreet(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="newRegCity">
            <label>City:</label>
            <div>
              <input
                type="text"
                onChange={e => this.updateCity(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="newRegState">
            <label>State</label>
            <select
              name="state"
              id="state"
              onChange={e => this.updateState(e.target.value)}
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
          </div>

          <div className="newRegZip">
            <label>Zip Code:</label>
            <div>
              <input
                type="text"
                onChange={e => this.updateZip(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="newRegPhone">
            <label>Phone:</label>
            <div>
              <input
                type="text"
                onChange={e => this.updatePhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="newRegRegisterAs">
            <label> Register As</label>
            <select
              name="registerOption"
              onChange={e => this.updateRole(e.target.value)}
              required
            >
              <option value="">Role</option>
              <option value="Tenant">Tenant</option>
            </select>
          </div>

          <div className="buttonContainer">
            <button type="submit" id="newRegSubmit">
              Create Account
            </button>
          </div>
        </form>
      </main>
    );
  }
}
