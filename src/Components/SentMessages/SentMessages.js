import React from "react";
import "./SentMessages.css";
import { Link } from "react-router-dom";
import ComBox from "../ComBox/ComBox.js";
import AppContext from "../../Context.js";
import config from "../../config.js";

// Message history page. All messages appear here regardless if they are hidden or not in communications page.

export default class SentMessages extends React.Component {
  static contextType = AppContext;

  componentDidMount() {
    // Sent in case user sets inbox as a browser favorite, will update context info.
    fetch(`${config.API_ENDPOINT}/contacts/data/2`, {
      //--- 2 needs updated to ${this.props.match.params.id} once login done
      method: "GET",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.status);
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

    // Gets INBOX, SENT, and ALL messages
    fetch(
      `${config.API_ENDPOINT}/messages/${this.context.contactInfo.userid}`,
      {
        //--- 2 needs updated to ${this.props.match.params.id} once login done
        method: "GET",
      }
    )
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
    if (arr <= 0) {
      messageHits.push(
        <div className="noMessageHistory" key={1}>
          <p> No Messages</p>
        </div>
      );
    } else {
      for (let i = 0; i < arr.length; i++) {
        messageHits.push(
          <div className="historyContainer" key={i}>
            <Link to={`/communications/details/${arr[i].messageid}`}>
              <ComBox messageInfo={arr[i]} />
            </Link>
          </div>
        );
      }
    }

    return (
      <main className="messageHistoryPage">
        <h1>Sent Box</h1>
        <p id="historyBack">
          <Link to="/Communications">Back</Link>
        </p>
        {messageHits}
      </main>
    );
  }
}
