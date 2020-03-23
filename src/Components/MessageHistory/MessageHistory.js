import React from 'react';
import "./MessageHistory.css"
import {Link} from "react-router-dom";
import ComBox from "../ComBox/ComBox.js";

export default function MessageHistory(){

        return(
            <main className="messageHistoryPage">
                <h1>Message History</h1>

                <p id='historyBack'><Link to = "/Communications">Back</Link></p>
                    <ComBox/>


            </main>
        );
}