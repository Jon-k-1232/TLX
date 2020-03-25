import React from "react";
import "./Account.css";
import AppContext from "../../Context.js";

export default class Account extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      company: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      email: "",
      phone: "",
    };
  }

  // updates name of company account state
  updateName = (company) => {
    this.setState({
      company: company,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      email: this.state.email,
      phone: this.state.phone,
    });
  };

  // updates address account state
  updateAddress = (street) => {
    this.setState({
      company: this.state.company,
      street:street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      email: this.state.email,
      phone: this.state.phone,
    });
  };

  // updates city of account state
  updateCity = (city) => {
    this.setState({
      company: this.state.company,
      street: this.state.street,
      city: city,
      state: this.state.state,
      zip: this.state.zip,
      email: this.state.email,
      phone: this.state.phone,
    });
  };

  // updates state of account state
  updateState = (state) => {
    this.setState({
      company: this.state.company,
      street: this.state.street,
      city: this.state.city,
      state: state,
      zip: this.state.zip,
      email: this.state.email,
      phone: this.state.phone,
    });
  };

  // updates zip of account state
  updateZip = (zip) => {
    this.setState({
      company: this.state.company,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: zip,
      email: this.state.email,
      phone: this.state.phone,
    });
  };

  // updates email of account state
  updateEmail = (email) => {
    this.setState({
      company: this.state.company,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      email: email,
      phone: this.state.phone,
    });
  };

  // updates phone of account state
  updatePhone = (phone) => {
    this.setState({
      company: this.state.company,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      email: this.state.email,
      phone: phone,
    });
  };

  // handles submit for contact info update
  handleSubmit = e => {
    e.preventDefault();
    this.context.setContactInfo({ ...this.state });
  };

  render() {
    let contactInfo = this.context.contactInfo;
    console.log(contactInfo)

    return (
      <main className="accountPage">
        <h1>Account</h1>

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

        <div className="accountContact">
          <h3>Contact information</h3>

          <div className='contactCompanyName'>
            <h5>Company: </h5>
            <div>
              <p>{contactInfo.company}</p>
            </div>
          </div>

          <div className='contactAddress'>
            <h5>Address: </h5>
            <div>
              <p>{contactInfo.street}</p> <br/>
              <p>{contactInfo.city}, {contactInfo.state} {contactInfo.zip}</p>
            </div>
          </div>

          <div className="contactPhone">
            <h5>Phone: </h5>
            <div>
              <p>{contactInfo.phone}</p>
            </div>
          </div>

          <div className='contactEmail'>
            <h5>Email: </h5>
            <div>
              <p>{contactInfo.email}</p>
            </div>
          </div>
        </div>

        <div className="accountAddress">
          <h3>Update your contact information</h3>
          <form className="contactInformation" onSubmit={this.handleSubmit}>
            <input type="text"
                   placeholder="Company Name"
                   onChange={e => this.updateName(e.target.value)}
                   required
            />
            <input type="text"
                   placeholder="Street Address"
                   onChange={e => this.updateAddress(e.target.value)}
                   required
            />
            <input type="text"
                   placeholder="City"
                   onChange={e => this.updateCity(e.target.value)}
                   required
            />
            <select name="state"
                    id="state"
                    onChange={e => this.updateState(e.target.value)}
                    required
                    >
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

            <input type="text"
                   placeholder="Zip"
                   onChange={e => this.updateZip(e.target.value)}
                   required
            />
            <input type="text"
                   placeholder="Email"
                   onChange={e => this.updateEmail(e.target.value)}
                   required
            />
            <input type="text"
                   placeholder="Phone"
                   onChange={e => this.updatePhone(e.target.value)}
                   required
            />
            <button type="submit">Save</button>
          </form>
        </div>

        <div className="accountPropManager">
          <h3>Property Manager:</h3>
          <p>{this.context.propertyManager}</p>
        </div>
      </main>
    );
  }
}
