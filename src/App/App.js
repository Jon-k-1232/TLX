import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "../Components/Register/Register.js";
import SentMessages from "../Components/SentMessages/SentMessages.js";
import NewMessage from "../Components/NewMessage/NewMessage.js";
import Footer from "../Components/Footer/Footer.js";
import Header from "../Components/Header/Header.js";
import Account from "../Components/Account/Account.js";
import Coms from "../Components/Coms/Coms.js";
import SignIn from "../Components/SignIn/SignIn.js";
import Billing from "../Components/Billing/Billing.js";
import InvoiceDetails from "../Components/InvoiceDetails/InvoiceDetails.js";
import MessageDetails from "../Components/MessageDetails/MessageDetails.js";
import MainPage from "../Components/MainPage/MainPage.js";
import AppContext from "../Context.js";
import PublicOnlyRoute from "../Components/Utils/PublicOnlyRoute.js";
import PrivateRoute from "../Components/Utils/PrivateRoute.js";

export default class App extends React.Component {
  state = {
    contactInfo: {},
    managerInfo: {},
    messages: [],
    inboxMessages: [],
    sentMessages: [],
    bills: [],
    setContactInfo: (company) => {
      this.setState({ contactInfo: company });
    },
    setManagerInfo: (managerInfo) => {
      this.setState({ managerInfo: managerInfo });
    },
    setMessage: (message) => {
      this.setState({ messages: message });
    },
    setInboxMessage: (inboxMessage) => {
      this.setState({ inboxMessages: inboxMessage });
    },
    setSentMessage: (sentMessage) => {
      this.setState({ sentMessages: sentMessage });
    },
    setBillsInfo: (bills) => {
      this.setState({ bills: bills });
    },
    setReset: () => {
      this.setState({
        contactInfo: {},
        managerInfo: {},
        messages: [],
        inboxMessages: [],
        sentMessages: [],
        bills: [],
      });
    },
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <main className="App">
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/Sign-in" component={SignIn} />
              <PublicOnlyRoute path="/Register" component={Register} />

              <PrivateRoute exact path="/Billing" component={Billing} />
              <PrivateRoute
                path="/Billing/invoice/:id"
                component={InvoiceDetails}
              />
              <PrivateRoute exact path="/Communications" component={Coms} />
              <PrivateRoute
                exact
                path="/Communications/details/:id"
                component={MessageDetails}
              />
              <PrivateRoute
                path="/Communications/New/:id"
                component={NewMessage}
              />
              <PrivateRoute
                path="/Communications/Sent"
                component={SentMessages}
              />
              <PrivateRoute path="/Account/" component={Account} />
            </Switch>
            <Footer />
          </BrowserRouter>
        </main>
      </AppContext.Provider>
    );
  }
}
