import React from 'react';
import "./MessageHistory.css"
import {Link} from "react-router-dom";
import ComBox from "../ComBox/ComBox.js";
import AppContext from "../../Context.js";

export default class MessageHistory extends React.Component{
    static contextType = AppContext;



render() {

    let arr = this.context.messages;
    let messageHits = [];


    if(arr <= 0){
        messageHits.push(
            <div className="noMessageContainer">
                <p> No Messages</p>
            </div>
        )

    }else{
        for (let i = 0; i < arr.length; i++) {
            messageHits.push(
                <div className="hitItemContainer" key={i}>
                    <Link to={`/communications/details/${arr[i].messageId}`}>
                        <ComBox messageInfo={arr[i]}/>
                    </Link>
                </div>
            )
        }
    }

    return (
        <main className="messageHistoryPage">
            <h1>Message History</h1>

            <p id='historyBack'><Link to="/Communications">Back</Link></p>
            {messageHits}


        </main>
    );
}
}