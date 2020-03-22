import React from 'react';
import "./Header.css"
import { Link } from "react-router-dom";


export class Header extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            menuDisplay: false,
        };
    }


    hamburger = () => {
        document.querySelector(".hamburger").classList.toggle("change");
    };



    render(){


        return(
            <header>
                <h1><Link to="/"> TLX </Link>{" "}</h1>
                <div className="topNav">
                    <div className="hamburger" id="menu-icon" type="button" onClick={this.hamburger}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>

                    <ol className='menuItems'>
                        <li><Link to = "/Billing">Billing</Link></li>
                        <li><Link to = "/Communications">Communications</Link></li>
                        <li><Link to = "/Account">Account</Link></li>
                    </ol>
                </div>
            </header>
        );
    }
}



/*
    hamburger = () => {
        document.querySelector(".hamburger").classList.toggle("change");
        let x = document.getElementsByClassName(".menuItems");
        if (this.state.menuDisplay === false) {
            this.setState({menuDisplay:true});
            console.log('hello')

        } else {
            this.setState({menuDisplay:false});
            console.log("goodbye")
        }
    };
 */