import React from "react";
import "./NewMessage.css";
import { Link } from "react-router-dom";
import TokenService from "../Services/token-service.js";
import config from "../../config.js";
import AppContext from "../../Context.js";
import newMessage from "../Images/newMessage.png";
import UserService from "../Services/user-service.js";

// New message form page. Used to type a new message.

export default class NewMessage extends React.Component {
  static contextType = AppContext;

  state = {
    messageId: "",
    date: "",
    to: "",
    toUserId: "",
    from: "",
    fromUserId: "",
    subject: "",
    subjectId: "",
    messageContent: "",
    groupId: "",
  };

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/contacts/data/${UserService.getUserId()}`, {
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

  // Sets the subject and initial message data when no subject is being passed
  updateSubject = (subject) => {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();

    let contactInfo = this.context.contactInfo;

    this.setState({
      messageId: this.context.messages.length + 1,
      date: curr_month + "/" + curr_date + "/" + curr_year,
      to: contactInfo.managerName,
      toUserId: contactInfo.managerId,
      from: contactInfo.company,
      fromUserId: contactInfo.userid,
      subject: subject,
      subjectId: parseInt(this.props.match.params.id),
      groupId: contactInfo.groupId,
    });
  };

  // Updates message body when no subject id is present.
  updateMessageBody = (messageBody) => {
    this.setState({
      messageContent: messageBody,
    });
  };

  /*
    This updates the message body and sets the fixed subject line
  */
  updateMessageBodyTwo = (messageBody) => {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();

    let contactInfo = this.context.contactInfo;

    // recalling as message not passing through onChange.
    let message = this.context.messages.find(
      (res) => res.subjectId === parseInt(this.props.match.params.id)
    );

    this.setState({
      messageId: this.context.messages.length + 1,
      date: curr_month + "/" + curr_date + "/" + curr_year,
      to: contactInfo.managerName,
      toUserId: contactInfo.managerId,
      from: contactInfo.company,
      fromUserId: contactInfo.userid,
      subject: message.subject,
      subjectId: parseInt(this.props.match.params.id),
      messageContent: messageBody,
      groupId: contactInfo.groupId,
    });
  };

  // submits form
  handleSubmit = (e) => {
    e.preventDefault();

    const sendMessage = { ...this.state };

    fetch(`${config.API_ENDPOINT}/messages/${UserService.getUserId()}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
        Origin: `${config.FRONT_WEB}`,
      },
      body: JSON.stringify(sendMessage),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Message sent successfully");
      })
      .catch((error) => alert(error));

    this.props.history.push("/Communications");
  };

  render() {
    // Reads passed prop in address like and searches for matching message subject Id.
    let message = this.context.messages.find(
      (res) => res.subjectId === parseInt(this.props.match.params.id)
    );

    return (
      <main className="newMessagePage">
        <div className="newIcon">
          <img src={newMessage} alt="new email icon" />
          <h2>New Message</h2>
        </div>

        <div className="newMessage">
          <div>
            <p id="messageDiscard">
              <Link to="/Communications">Discard</Link>
            </p>
          </div>

          {/*
            Conditionally renders the subject line based on if a subject line is present or not.
            The subject line value will be pre filled if replying to a message, and empty if a new message.
          */}
          {!message ? (
            // If no pre-existing subject Id then will render the below.
            <form className="newMessageForm" onSubmit={this.handleSubmit}>
              <input
                id="messageSubject"
                // conditionally renders a place holder, allows user to update the subject line
                placeholder="Subject"
                maxLength="45"
                type="text"
                onChange={(e) => this.updateSubject(e.target.value)}
                required
              ></input>

              <textarea
                id="messageText"
                type="text"
                wrap="soft"
                placeholder="Write a message in 500 characters..."
                maxLength="500"
                onChange={(e) => this.updateMessageBody(e.target.value)}
                required
              />

              <button type="Submit" id="messageSubButton">
                Submit
              </button>
            </form>
          ) : (
            // If there is a  pre-existing subject Id then this will render the below.
            <form className="newMessageForm" onSubmit={this.handleSubmit}>
              <input
                id="messageSubject"
                // conditionally renders and inserts subject line as value if a reply to a prior message
                value={message.subject}
                maxLength="65"
                type="text"
                onChange={(e) => this.updateSubject(e.target.value)}
                required
              ></input>

              <textarea
                id="messageText"
                type="text"
                wrap="soft"
                placeholder="Write a review in 500 characters..."
                maxLength="500"
                onChange={(e) => this.updateMessageBodyTwo(e.target.value)}
                required
              />

              <button type="Submit" id="messageSubButton">
                Submit
              </button>
            </form>
          )}
        </div>
      </main>
    );
  }
}
