import React from "react";
import "./MessageDetails.css";
import AppContext from "../../Context.js";
import { Link } from "react-router-dom";

/*
 Message details. When a user Clicks on a message in the communications page the user is routed here.
 */
export default class MessageDetails extends React.Component {
  static contextType = AppContext;

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
        <div className="messageDetailsReply">
          <p>
            <Link to="/Communications">Back</Link>
          </p>
          <p>
            <Link to={`/Communications/New/${messageNumber.subjectId}`}>
              Reply
            </Link>
          </p>
        </div>

        {threadMaker}
      </main>
    ) : (
      ""
    );
  }
}
