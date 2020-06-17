import React from "react";
import "./Alerts.css";
import TokenService from "../Services/token-service.js";
import AppContext from "../../Context.js";
import config from "../../config.js";
import UserService from "../Services/user-service.js";

// Alerts page, Accessible by manager profile and used to push alerts within management group

// Being worked on

export default class Alerts extends React.Component {
  static contextType = AppContext;

  state = {
    alertMessage: "",
    urgency: "",
    groupId: "",
    recipient: "",
    tenantList: [],
    time: "",
    currentAlert: "test",
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

    // this api will gather all the names of tenants in the group and store into state.
    /*
        fetch(`${config.API_ENDPOINT}/registration/new`, {
            method: "GET",
            headers: {
                Origin: `${config.FRONT_WEB}`,
            },
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error(resp.status);
                }
                return resp.json();
            })
            .then((data) => {
                this.setState({ tenantList: data.tenantList });
            })
            .catch((error) => {
                alert(error);
            });

         */
    // This Api will call for current alerts then store in state
    /*
    fetch(`${config.API_ENDPOINT}/alert/current`, {
        method: "GET",
        headers: {
            Origin: `${config.FRONT_WEB}`,
        },
    })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(resp.status);
            }
            return resp.json();
        })
        .then((data) => {
            this.setState({ currentAlert: data.Alert });
        })
        .catch((error) => {
            alert(error);
        });

     */
  }

  // updates state from input name with value of input
  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      groupId: this.context.contactInfo.groupId,
    });
    console.log({ ...this.state });
  };

  // submits form
  handleSubmit = (e) => {
    e.preventDefault();
    //console log is temporary as no endpoint developed yet
    console.log("API TO SEND TO BACKEND");
    /*
        const sendAlert = { ...this.state };

        fetch(`${config.API_ENDPOINT}/messages/${UserService.getUserId()}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `bearer ${TokenService.getAuthToken()}`,
                Origin: `${config.FRONT_WEB}`,
            },
            body: JSON.stringify(sendAlert),
        })
            .then((res) => res.json())
            .then((res) => {
                alert(res.message);
            })
            .catch((error) => alert(error));
 */
  };

  render() {
    let arr = this.state.tenantList;
    let groupMembers = [];

    // Iterates through the list of registered tenants and creates an option in the recipient drop down.
    for (let i = 0; i < arr.length; i++) {
      groupMembers.push(
        <option value={arr[i].userid} key={i}>
          {arr[i].company}
        </option>
      );
    }

    const recipientOption = () => {
      return (
        <div className="recipient">
          <label>Recipient: </label>
          <div>
            <select
              name="recipient"
              id="recipient"
              onChange={(e) => this.change(e)}
              value={this.state.recipient}
              required
            >
              <option value="">Select User or All</option>
              <option value={this.state.groupId}>all</option>
              {this.state.tenantList >= 1 ? { groupMembers } : ""}
            </select>
          </div>
        </div>
      );
    };

    return (
      <main className="alertsPage">
        <h2>Alerts</h2>

        <form className="newAlertForm" onSubmit={this.handleSubmit}>
          <div className="urgency">
            <label>Urgency: </label>
            <div>
              <select
                name="urgency"
                id="urgency"
                onChange={(e) => this.change(e)}
                value={this.state.urgency}
                required
              >
                <option value="">Select Level</option>
                <option value="high">High</option>
                <option value="moderate">Moderate</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className="time">
            <label>How long: </label>
            <div>
              <select
                name="time"
                id="time"
                onChange={(e) => this.change(e)}
                value={this.state.time}
                required
              >
                <option value="">Select Time Frame</option>
                <option value="7">1 week</option>
                <option value="14">2 weeks</option>
                <option value="21">3 weeks</option>
                <option value="35">4 weeks</option>
                <option value="42">5 weeks</option>
              </select>
            </div>
          </div>

          {recipientOption()}

          <textarea
            name="alertMessage"
            id="alertText"
            type="text"
            wrap="soft"
            placeholder="Write a message in 200 characters..."
            maxLength="200"
            onChange={(e) => this.change(e)}
            value={this.state.alertMessage}
            required
          />
          <div className="buttonContainer">
            <button type="submit" id="newRegSubmit">
              Push Alert
            </button>
          </div>
        </form>

        {/*
            Conditionally renders Current Alert if there is an active Alert.
        */}
        {this.state.currentAlert >= 1 + "" ? (
          <div>
            <h2>Current Alert</h2>
            <div>
              <p>{this.state.currentAlert}</p>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    );
  }
}
