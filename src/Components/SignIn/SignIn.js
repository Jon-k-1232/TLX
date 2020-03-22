import React from 'react';
import "./SignIn.css"
import {Link} from "react-router-dom";

export default class SignIn extends React.Component {

    render() {
        return(
            <main className="signInPage">
                <div id="homePicture">
                    <h2>Picture box</h2>
                </div>

                <div className="signContainer">
                    <form className="signInForm">
                        <input
                            id="usernameInput"
                            type="text"
                            placeholder="Username"
                            required
                        />
                        <input
                            id="passwordInput"
                            type="text"
                            placeholder="Password"
                            required
                        />
                    </form>
                    <button type="submit" id="signInButton">
                        SIGN ME IN
                    </button>
                    <p id="signInNewUser">
                        <Link to = "/user/register">Create a New Account</Link>
                    </p>
                </div>
            </main>
        );
    }
}