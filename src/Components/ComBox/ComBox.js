import React from 'react';
import "./ComBox.css";

// Used to generate each overview box of payment invoice history in billing screen

export default function ComBox(props){


    return props.messageInfo ? (
        <div className="messageBox">
            <p>{props.messageInfo.date}</p>
            <h4>{props.messageInfo.from}</h4>
            <h5>{props.messageInfo.subject}</h5>
            <p>{props.messageInfo.messageContent}</p>
        </div>
    ) : (
        ''
    );

}