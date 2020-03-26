import React from 'react';
import "./LoggedOut.css"
import {Link} from "react-router-dom";

export default function LoggedOut() {

        return (
            <main className='loggedOutPage'>
                <div className="loggedOutView">
                    <h3>Please log into your account.</h3>
                    <Link to='/'>Sign In</Link>
                </div>
            </main>
        );
}