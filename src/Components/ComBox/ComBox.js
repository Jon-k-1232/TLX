import React from "react";
import "./ComBox.css";

// Used to generate each overview box of communications page.

export default function ComBox(props) {
  return props.messageInfo ? (
    <div className="messageBox">
      <div className="infoWithLink">
        <p>{props.messageInfo.date}</p>
        <p id="quickView">View</p>
      </div>
      <h4>From: {props.messageInfo.from}</h4>
      <h5>Subject: {props.messageInfo.subject}</h5>
      <p>{props.messageInfo.messageContent}</p>
    </div>
  ) : (
    ""
  );
}
