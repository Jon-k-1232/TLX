import React from "react";
import "./ComBox.css";

// Used to generate each overview box of communications page.

export default function ComBox(props) {
  return props.messageInfo ? (
    <div className="messageBox">
      <p id="quickView">View</p>
      <p>{props.messageInfo.date}</p>
      <h4>From: {props.messageInfo.from}</h4>
      <h4>To: {props.messageInfo.to}</h4>
      <h5>Subject: {props.messageInfo.subject}</h5>
      <p>{props.messageInfo.messageContent}</p>
    </div>
  ) : (
    ""
  );
}
