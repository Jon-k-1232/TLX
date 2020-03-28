
import React from 'react';
import "./NewMessage.css"
import {Link} from "react-router-dom";
import AppContext from "../../Context.js";

export default class NewMessage extends React.Component{
    static contextType = AppContext;

    render() {

        let message = this.context.messages.find(res => res.subjectId === this.props.match.params.id);

        return (
            <main className="newMessagePage">
                <h1>New Message</h1>

                <div className='newMessage'>

                    <form className='newMessageForm'>
                        <input
                            id='messageSubject'
                            // conditionally renders a place holder if the subject id matches passed prop
                            placeholder={! message ? ('Subject') : (message.subject)}
                            maxLength="65"
                            required
                        >
                        </input>
                        <textarea
                            id="messageText"
                            type="text"
                            wrap="soft"
                            placeholder="Write a review in 500 characters..."
                            maxLength="500"
                            required
                        />
                        <button type="submit" id="messageSubButton">
                            <Link to="/Communications">Submit</Link>
                        </button>
                        <p id="messageDiscard"><Link to="/Communications">Discard</Link></p>
                    </form>
                </div>
            </main>
        );
    }
}