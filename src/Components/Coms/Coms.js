import React from "react";
import "./Coms.css";
import { Link } from "react-router-dom";
import config from "../../config.js";
import AppContext from "../../Context.js";
import ComBox from "../ComBox/ComBox.js";

// Communications page

export default class Coms extends React.Component {
  static contextType = AppContext;

  async componentDidMount() {
    // Sent in case user sets inbox as a browser favorite, will update context info.
    await fetch(`${config.API_ENDPOINT}/contacts/data/2`, {
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
    // gets all messages
    let allMessages = this.context.messages.length + 1;

    // set for the rendering of the new messages only
    let arr = this.context.inboxMessages;
    let messageHits = [];

    /*
    Conditionally renders no messages if no messages in messages context array,
    or generates message if messages in the messages context array.
    */
    if (arr.length <= 0) {
      messageHits.push(
        <div className="noMessageContainer" key={1}>
          <p> No Messages</p>
        </div>
      );
    } else {
      // Cycles through the context messages context array to display messages
      for (let i = 0; i < arr.length; i++) {
        messageHits.push(
          <div className="hitItemContainer" key={i}>
            <Link to={`/communications/details/${arr[i].messageid}`}>
              <ComBox messageInfo={arr[i]} />
            </Link>
          </div>
        );
      }
    }

    return (
      <main className="comPage">
        <h1>Communications</h1>
        <div className="comPageNav">
          <p id="newCommLink">
            <Link to={`/Communications/New/${allMessages}`}>New</Link>
          </p>
          <p id="historyCommLink">
            <Link to="/Communications/Sent">Sent Box</Link>
          </p>
        </div>
        {messageHits}
      </main>
    );
  }
}
