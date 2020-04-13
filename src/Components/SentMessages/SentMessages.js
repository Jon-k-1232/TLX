import React from "react";
import "./SentMessages.css";
import { Link } from "react-router-dom";
import TokenService from "../Services/token-service.js";
import ComBox from "../ComBox/ComBox.js";
import AppContext from "../../Context.js";
import config from "../../config.js";

// Sent message page, similar to a sent box in email.

export default class SentMessages extends React.Component {
  static contextType = AppContext;

  // Gets INBOX, SENT, and ALL messages
  componentDidMount() {
    const userId = this.context.contactInfo.userid;

    fetch(`${config.API_ENDPOINT}/messages/${userId}`, {
      method: "GET",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          this.context.setReset();
          TokenService.clearAuthToken();
          this.props.history.push("/");
          this.context.setLoggedIn(false);
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
        <h1>Sent Box</h1>
        <p id="historyBack">
          <Link to="/Communications">Back</Link>
        </p>

        {/*
          If there are no sent messages, no messages will render, but if there
          are 1 or more messages the messages will render
          */}
        {arr <= 0 ? (
          <div className="noMessageContainer">
            <p> No Messages</p>
          </div>
        ) : (
          arraySort()
        )}
      </main>
    ) : (
      ""
    );
  }
}
