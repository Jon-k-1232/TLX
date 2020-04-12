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
          throw new Error(resp.status);
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

    return arr ? (
      <main className="messageHistoryPage">
        <h1>Sent Box</h1>
        <p id="historyBack">
          <Link to="/Communications">Back</Link>
        </p>
        {messageHits}
      </main>
    ) : (
      <main className="messageHistoryPage">
        <h1>Sent Box</h1>
        <p id="historyBack">
          <Link to="/Communications">Back</Link>
        </p>
        <p>No Messages</p>
      </main>
    );
  }
}
