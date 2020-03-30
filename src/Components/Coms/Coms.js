import React from "react";
import "./Coms.css";
import { Link } from "react-router-dom";
import AppContext from "../../Context.js";
import ComBox from "../ComBox/ComBox.js";

// Communications page

export default class Coms extends React.Component {
  static contextType = AppContext;

  render() {
    let arr = this.context.messages;
    let messageHits = [];

    // Conditionally renders no messages if no messages in messages context array
    if (arr.length <= 0) {
      messageHits.push(
        <div className="noMessageContainer" key={1}>
          <p> No Messages</p>
        </div>
      );
      // Conditionally renders all messages in context message array, passes props to ComBox to generate each message.
    } else {
      for (let i = 0; i < arr.length; i++) {
        messageHits.push(
          <div className="hitItemContainer" key={i}>
            <Link to={`/communications/details/${arr[i].messageId}`}>
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
            <Link to={`/Communications/New/${arr.length + 1}`}>New</Link>
          </p>
          <p id="historyCommLink">
            <Link to="/Communications/History">History</Link>
          </p>
        </div>
        {messageHits}
      </main>
    );
  }
}
