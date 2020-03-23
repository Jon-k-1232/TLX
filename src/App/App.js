import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Register } from "../Components/Register/Register.js";
import MessageHistory from "../Components/MessageHistory/MessageHistory.js";
import NewMessage from "../Components/NewMessage/NewMessage.js";
import { Footer } from "../Components/Footer/Footer.js";
import { Header } from "../Components/Header/Header.js";
import Account from "../Components/Account/Account.js";
import Coms from "../Components/Coms/Coms.js";
import SignIn from "../Components/SignIn/SignIn.js";
import Billing from "../Components/Billing/Billing.js";
import MessageDetails from "../Components/MessageDetails/MessageDetails.js";
import AppContext from "../Context.js";

export default class App extends React.Component {
  constructor() {
    super();
    // state is being set in order to mimic api data inbound.
    this.state = {
      messages: [
        {
          userId: 'uXolWvg49Co5EfCo',
          messageId:'jndicbuwc87adc78vds',
          date: '3/10/20',
          to: 'Jon Kimmel',
          from: 'Property Manager',
          subject: 'This is the subject line',
          messageContent: 'This is a test of a short message content.',
        },
        {
          companyId: 'uXolWvg49Co5EfCo',
          messageId:'jndicbuwc87a12342',
          date: '3/8/20',
          to: 'Jon Kimmel',
          from: 'Property Manager',
          subject: 'Another subject line test',
          messageContent: 'This is a test of a slightly longer message. Text limits will have a 500 character limit.',
        }],

    };
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <main className="App">
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/" component={SignIn} />
              <Route path="/register" component={Register} />
              <Route path="/Billing" component={Billing} />
              <Route exact path="/Communications" component={Coms} />
              <Route exact path="/Communications/details/:id" component={MessageDetails} />
              <Route path="/Communications/New" component={NewMessage} />
              <Route path="/Communications/History" component={MessageHistory}/>
              <Route path="/Account" component={Account} />
            </Switch>
            <Footer />
          </BrowserRouter>
        </main>
      </AppContext.Provider>
    );
  }
}
