import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Register} from "../Components/Register/Register.js";
import MessageHistory from "../Components/MessageHistory/MessageHistory.js";
import NewMessage from "../Components/NewMessage/NewMessage.js";
import {Footer} from "../Components/Footer/Footer.js";
import {Header} from "../Components/Header/Header.js";
import TenantAccount from "../Components/TenantAccount/TenantAccount.js";
import TenantComs from "../Components/TenantComs/TenantComs.js";
import SignIn from "../Components/SignIn/SignIn.js";
import TenantBilling from "../Components/TenantBilling/TenantBilling.js";
import AppContext from "../Context.js";


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }


    render(){
        return (
            <AppContext.Provider value={this.state}>
                <main className='App'>
                    <BrowserRouter>
                        <Header/>
                        <Switch>
                            <Route exact path="/" component={SignIn} />
                            <Route path="/user/register" component={Register} />
                            <Route path="/Billing" component={TenantBilling} />
                            <Route exact path="/Communications" component={TenantComs} />
                            <Route path="/Communications/New" component={NewMessage} />
                            <Route path="/Communications/History" component={MessageHistory} />
                            <Route path="/Account" component={TenantAccount} />
                        </Switch>
                        <Footer/>
                    </BrowserRouter>
                </main>
            </AppContext.Provider>
        );
    }
}