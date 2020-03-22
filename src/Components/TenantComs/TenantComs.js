import React from 'react';
import "./TenantComs.css"
import {Link} from "react-router-dom";
import AppContext from "../../Context.js";

export default class TenantComs extends React.Component {
    static contextType = AppContext;


    render() {

        return(
            <main className='comPage'>
                <h1>Communications</h1>
                <p id='newCommLink'><Link to = "/Communications/New">New</Link></p>
                <p id='historyCommLink'><Link to = "/Communications/History">History</Link></p>

                <div className='messageOne'>
                    <p>mm/dd/yyyy</p>
                    <h4>To/From</h4>
                    <h5>Subject</h5>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                        Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                        mus.
                        Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis
                        enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
                        rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
                        Integer tincidunt. Cras dapibu
                    </p>
                </div>
                <div className='messageTwo'>
                    <p>mm/dd/yyyy</p>
                    <h4>To/From</h4>
                    <h5>Subject</h5>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                        Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                        mus.
                        Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis
                        enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
                        rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
                        Integer tincidunt. Cras dapibu
                    </p>
                </div>
                <div className='messageThree'>
                    <p>mm/dd/yyyy</p>
                    <h4>To/From</h4>
                    <h5>Subject</h5>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                        Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                        mus.
                        Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis
                        enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
                        rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
                        Integer tincidunt. Cras dapibu
                    </p>
                </div>
            </main>
        );
    }
}