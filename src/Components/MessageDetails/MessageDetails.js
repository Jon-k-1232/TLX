import React from 'react';
import "./MessageDetails.css"
import ComBox from "../ComBox/ComBox.js";
import AppContext from "../../Context.js";
import { Link } from "react-router-dom";


export default class  MessageDetails extends React.Component{
    static contextType = AppContext;

    render() {
        let messageNumber = this.context.messages.find(res => res.messageId === this.props.match.params.id);

        return messageNumber ? (
            <main className="messageDetailsPage">
                <div className="messageDetailsReply">
                    <p>
                        <Link to="/Communications">Back</Link>
                    </p>
                    <p>
                        <Link to="/Communications/New">Reply</Link>
                    </p>
                </div>
                <ComBox messageInfo={messageNumber}/>
            </main>
        ) : (
            ""
        );
    }
}


