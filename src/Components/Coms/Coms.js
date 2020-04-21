import React from "react";
import "./Coms.css";
import { Link } from "react-router-dom";
import config from "../../config.js";
import AppContext from "../../Context.js";
import ComBox from "../ComBox/ComBox.js";
import TokenService from "../Services/token-service.js";

// Communications page

export default class Coms extends React.Component {
  static contextType = AppContext;

  // Gets INBOX, SENT, and ALL messages
  componentDidMount() {
    const userId = this.context.contactInfo.userid;

    fetch(`${config.API_ENDPOINT}/messages/${userId}`, {
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
    // gets all messages and add'd 1. This is needed in order to pass the prop to send new message
    let allMessages = this.context.messages.length + 1;

    // set for the rendering of the new messages only
    let arr = this.context.inboxMessages;
    let messageHits = [];

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

    /*
      Since new messages are pushed onto end of the array from DB this will reverse
      the array so that the newest will render to the top
    */
    let arraySort = () => {
      return messageHits.reverse();
    };

    return (
      <main className="comPage">
        <h1>Inbox</h1>

        {/*
          If there are no sent messages, no messages will render, but if there
          are 1 or more messages the messages will render
          */}
        {arr <= 0 ? (
          <div className='comPageLarge'>
            <div className="comPageNavNo">
              <p id="newCommLink">
                <Link to={`/Communications/New/${allMessages}`}>New Message</Link>
              </p>
              <p id="historyCommLink">
                <Link to="/Communications/Sent">Sent Box</Link>
              </p>
            </div>

            <div className="noMessageContainer">
              <p> No Messages</p>
            </div>
          </div>
        ) : (
          <div className='comPageLarge'>
            <div className="comPageNav">
              <p id="newCommLink">
                <Link to={`/Communications/New/${allMessages}`}>New Message</Link>
              </p>
              <p id="historyCommLink">
                <Link to="/Communications/Sent">Sent Box</Link>
              </p>
            </div>
            <div className="messagesContainer">
              {arraySort()}
            </div>
          </div>
        )}
      </main>
    );
  }
}
