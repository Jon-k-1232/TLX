import React from "react";
import "./Register.css";
import config from "../../config.js";
import AppContext from "../../Context.js";

export default class Register extends React.Component {
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
    role: "",
    managerName: "none",
    managerId: 0,
    groupId: 0,
    managerList: "",
  };

  // Gets a list of managers who are registered
  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/registration/new`, {
      method: "GET",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then((data) => {
        this.setState({ managerList: data.managerList });
      })
      .catch((error) => {
        alert(error);
      });
  }

  // updates state from input name with value of input
  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // Updates role user is registering for
  updateRole = (role) => {
    // Logic add'd in case a user clicks on tenant then clicks back to manager option.
    if (role === "tenant") {
      this.setState({
        role: role,
      });
    } else {
      // If manager selected this will reset state, which needs to be clear for manager role to properly process on backend.
      this.setState({
        role: role,
        managerName: "none",
        managerId: 0,
        groupId: 0,
      });
    }
  };

  // This function will update state with the property manager info in order to link tenant to property manager
  updateManager = (selectedManager) => {
    // logic add'd to clear bug when switching managers, then selecting none or switching role to manager
    if (selectedManager === "none") {
      this.setState({
        managerName: "none",
        managerId: 0,
        groupId: 0,
      });
    } else {
      // locate the user id for the selected option
      let selectedManagerId = this.state.managerList.find(
        (res) => res.company === selectedManager
      );

      this.setState({
        managerName: selectedManager,
        managerId: selectedManagerId.userid,
        groupId: selectedManagerId.groupId,
      });
    }
  };

  // submits form to back end to create new user
  submit(e) {
    e.preventDefault();
    const registrationForm = { ...this.state };

    fetch(`${config.API_ENDPOINT}/registration/new`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Origin: `${config.FRONT_WEB}`,
      },
      body: JSON.stringify(registrationForm),
    })
      .then((res) => res.json())
      .catch((error) => alert(error));

    this.props.history.push("/");
  }

  render() {
    let arr = this.state.managerList;
    let managerOption = [];

    // Iterates through the list of registered property managers and creates an option in the property manger drop down.
    for (let i = 0; i < arr.length; i++) {
      managerOption.push(
        <option value={arr[i].company} key={i}>
          {arr[i].company}
        </option>
      );
    }

    // conditionally renders the option to select a manager if the new user registers as a tenant vs a property manager
    const managerOptionMenu = () => {
      if (this.state.role === "tenant") {
        return (
          <div className="newManagerList">
            <label>Property Manager</label>
            <select
              name="managerOption"
              onChange={(e) => this.updateManager(e.target.value)}
              required
            >
              <option value="none">Select a Property Manager</option>
              {managerOption}
            </select>
          </div>
        );
      }
    };

    return (
      <main className="RegisterPage">
        <h2>Create a TLX Account</h2>

        <form onSubmit={(e) => this.submit(e)}>
          <div className="newRegUserName">
            <label>Log In E-mail:</label>
            <div>
              <input
                type="email"
                name="email"
                maxLength="45"
                placeholder="Bob@Bobs.com"
                onChange={(e) => this.change(e)}
                value={this.state.email}
                required
              />
            </div>
          </div>

          <div className="newRegUserpassword">
            <label>Password:</label>
            <div>
              <input
                type="text"
                name="password"
                maxLength="25"
                placeholder="Password"
                onChange={(e) => this.change(e)}
                value={this.state.password}
                required
              />
            </div>
          </div>

          <div className="newRegCompany">
            <label>Company Name:</label>
            <div>
              <input
                type="text"
                name="company"
                placeholder="Bobs, Inc"
                maxLength="40"
                onChange={(e) => this.change(e)}
                value={this.state.company}
                required
              />
            </div>
          </div>

          <div className="newRegStreet">
            <label>Street:</label>
            <div>
              <input
                type="text"
                name="street"
                maxLength="45"
                placeholder="123 N. Washington St. #1"
                onChange={(e) => this.change(e)}
                value={this.state.street}
                required
              />
            </div>
          </div>

          <div className="newRegCity">
            <label>City:</label>
            <div>
              <input
                type="text"
                name="city"
                maxLength="25"
                placeholder="Phoenix"
                onChange={(e) => this.change(e)}
                value={this.state.city}
                required
              />
            </div>
          </div>

          <div className="newRegState">
            <label>State</label>
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
          </div>

          <div className="newRegZip">
            <label>Zip Code:</label>
            <div>
              <input
                type="text"
                name="zip"
                maxLength="6"
                placeholder="85254"
                onChange={(e) => this.change(e)}
                value={this.state.zip}
                required
              />
            </div>
          </div>

          <div className="newRegPhone">
            <label>Phone:</label>
            <div>
              <input
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                name="phone"
                minLength="12"
                maxLength="12"
                placeholder="602-123-4567"
                onChange={(e) => this.change(e)}
                value={this.state.phone}
                required
              />
            </div>
          </div>

          <div className="newRegRegisterAs">
            <label> Register As</label>
            <select
              name="role"
              onChange={(e) => this.updateRole(e.target.value)}
              required
            >
              <option value="">Role</option>
              <option value="tenant">Tenant</option>
              <option value="manager">Property Manager</option>
            </select>
          </div>

          {managerOptionMenu()}

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
