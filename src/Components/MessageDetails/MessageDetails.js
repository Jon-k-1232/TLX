import React from "react";
import "./MessageDetails.css";
import config from "../../config.js";
import UserService from "../Services/user-service.js";
import TokenService from "../Services/token-service.js";
import AppContext from "../../Context.js";
import { Link } from "react-router-dom";

/*
 Message details. When a user Clicks on a message in the communications page the user is routed here.
 */
export default class MessageDetails extends React.Component {
  static contextType = AppContext;

  // Gets INBOX, SENT, and ALL messages
  componentDidMount() {

    fetch(`${config.API_ENDPOINT}/messages/${UserService.getUserId()}`, {
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
          this.context.setInboxMessage(data.inboxMessages);
          this.context.setSentMessage(data.sentMessages);
          this.context.setMessage(data.allMessages);
        })
        .catch((error) => {
          alert(error);
        });

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

  render() {
    // reading message id passed in params and searching context for matching ID. Setting the message to messageNumber
    let messageNumber = this.context.messages.find(
      (res) => res.messageid === parseInt(this.props.match.params.id)
    );

    //reads the subject line of the message the user clicked on
    let subjectId = messageNumber ? messageNumber.subjectId : "";

    // reads all messages in user messages
    let messageArray = this.context.messages;

    //sets empty array for which data is to be push for render
    let threadMaker = [];

    /*
        this cycles the message data stored in context and outputs a div for each matching subject line based on the passed
         param for which a user clicks. To further explain this will match the message that the user clicks on
         with any other message that has a matching subject line.
         */
    for (let i = 0; i < messageArray.length; i++) {
      if (subjectId === messageArray[i].subjectId) {
        threadMaker.push(
          <div className="messageDetailsBox" key={i}>
            <p>{messageArray[i].date}</p>
            <h4>{messageArray[i].from}</h4>
            <h5>{messageArray[i].subject}</h5>
            <p>{messageArray[i].messageContent}</p>
          </div>
        );
      }
    }

    return messageNumber ? (
      <main className="messageDetailsPage">
        <div className="detailsContainer">
          <div className="messageDetailsReply">
            <p>
              <Link to={`/Communications/New/${messageNumber.subjectId}`}>
                New Message
              </Link>
            </p>
            <p>
              <Link to="/Communications">Inbox</Link>
            </p>
            <p>
              <Link to="/Communications/Sent">Sent</Link>
            </p>
          </div>

          <div className="messageDetailsContainer">{threadMaker}</div>
        </div>
      </main>
    ) : (
      ""
    );
  }
}
