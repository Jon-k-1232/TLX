import React from "react";
import "./NewMessage.css";
import { Link } from "react-router-dom";
import AppContext from "../../Context.js";

// New message form page. Used to type a new message.

export default class NewMessage extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      messageId: "",
      subjectId: "",
      date: "",
      to: "",
      from: "",
      subject: "",
      messageContent: ""
    };
  }

  updateSubject = subject => {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();

    this.setState({
      userId: this.context.contactInfo.userId,
      messageId: this.context.messages.length + 1 + "",
      subjectId: this.props.match.params.id,
      date: curr_month + "/" + curr_date + "/" + curr_year,
      to: this.context.propertyInfo.company,
      from: this.context.contactInfo.company,
      subject: subject,
      messageContent: this.state.message
    });
  };

  updateMessageBody = messageBody => {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();

    this.setState({
      userId: this.context.contactInfo.userId,
      messageId: this.context.messages.length + 1 + "",
      subjectId: this.props.match.params.id,
      date: curr_month + "/" + curr_date + "/" + curr_year,
      to: this.context.propertyInfo.company,
      from: this.context.contactInfo.company,
      subject: this.state.subject,
      messageContent: messageBody
    });
  };

  // this function is iterated to second version as the subject text needs set
  updateMessageBodyTwo = messageBody => {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();

    // recalling as message not passing through onChange.
    let message = this.context.messages.find(
      res => res.subjectId === this.props.match.params.id
    );

    this.setState({
      userId: this.context.contactInfo.userId,
      messageId: this.context.messages.length + 1 + "",
      subjectId: this.props.match.params.id,
      date: curr_month + "/" + curr_date + "/" + curr_year,
      to: this.context.propertyInfo.company,
      from: this.context.contactInfo.company,
      subject: message.subject,
      messageContent: messageBody
    });
  };

  // submits to update context.
  handleSubmit = e => {
    e.preventDefault();
    this.context.setMessage({ ...this.state });
    this.props.history.push("/Communications");
  };

  render() {
    // Reads passed prop in address like and searches for matching message subject Id.
    let message = this.context.messages.find(
      res => res.subjectId === this.props.match.params.id
    );

    return (
      <main className="newMessagePage">
        <h1>New Message</h1>

        <div className="newMessage">
          <p id="messageDiscard">
            <Link to="/Communications">Discard</Link>
          </p>

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
                onChange={e => this.updateSubject(e.target.value)}
                required
              ></input>

              <textarea
                id="messageText"
                type="text"
                wrap="soft"
                placeholder="Write a review in 500 characters..."
                maxLength="500"
                onChange={e => this.updateMessageBody(e.target.value)}
                required
              />

              <button type="Submit" id="messageSubButton">
                Submit
              </button>
            </form>
          ) : (
            // If there is a  pre-existing subject Id then will render the below.
            <form className="newMessageForm" onSubmit={this.handleSubmit}>
              <input
                id="messageSubject"
                // conditionally renders and inserts subject line as value if a reply to a prior message
                value={message.subject}
                maxLength="65"
                onChange={e => this.updateSubject(e.target.value)}
                required
              ></input>

              <textarea
                id="messageText"
                type="text"
                wrap="soft"
                placeholder="Write a review in 500 characters..."
                maxLength="500"
                onChange={e => this.updateMessageBodyTwo(e.target.value)}
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
