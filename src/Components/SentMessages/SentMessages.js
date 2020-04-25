import React from "react";
import "./SentMessages.css";
import { Link } from "react-router-dom";
import TokenService from "../Services/token-service.js";
import ComBox from "../ComBox/ComBox.js";
import AppContext from "../../Context.js";
import config from "../../config.js";
import sentBox from "../Images/sentBox.png";
import UserService from "../Services/user-service.js";

// Sent message page, similar to a sent box in email.

export default class SentMessages extends React.Component {
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
    let arr = this.context.sentMessages;
    let messageHits = [];

    // cycles through messages in context and renders the quick view boxes.
    for (let i = 0; i < arr.length; i++) {
      messageHits.push(
        <div className="historyContainer" key={i}>
          <Link to={`/communications/details/${arr[i].messageid}`}>
            <ComBox messageInfo={arr[i]} />
          </Link>
        </div>
      );
    }

    /*
    Since new messages are pushed onto end of the array from DB this will reverse
    the array so that the newest will render to the top
     */
    let arraySort = () => {
      return messageHits.reverse();
    };

    return arr ? (
      <main className="messageHistoryPage">
        <div className="sentIcon">
          <img src={sentBox} alt="sent box icon" />
          <h2>Sent</h2>
        </div>
        <div className="sentLarge">
          <div className="sentNav">
            <p>
              <Link
                to={`/Communications/New/${this.context.messages.length + 1}`}
              >
                New Message
              </Link>
            </p>
            <p>
              <Link to="/Communications">Inbox</Link>
            </p>
          </div>

          {/*
            If there are no sent messages, no messages will render, but if there
            are 1 or more messages the messages will render
            */}
          {arr <= 0 ? (
            <div className="noMessageContainer">
              <p> No Messages</p>
            </div>
          ) : (
            <div className="sentMessages">{arraySort()}</div>
          )}
        </div>
      </main>
    ) : (
      ""
    );
  }
}
