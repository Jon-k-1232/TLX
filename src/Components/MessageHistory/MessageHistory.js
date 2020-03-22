import React from 'react';
import "./MessageHistory.css"
import {Link} from "react-router-dom";

export default function MessageHistory(){

        return(
            <main className="messageHistoryPage">
                <h1>Message History</h1>

                <p id='historyBack'><Link to = "/Communications">Back</Link></p>
                <p>com history here</p>
            </main>
        );
}