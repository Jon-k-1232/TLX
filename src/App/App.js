import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import AuthenticatedComponent from "../Components/AuthenticatedComponent/AuthenticatedComponent.js";
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
import AppContext from "../Context.js";

export default class App extends React.Component {
  constructor() {
    super();
    // state is being set in order to mimic api data inbound.
    this.state = {
      user: {
        username: "",
        password: "",
        role: "",
      },
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

              {/*  <AuthenticatedComponent> */}
                <Route exact path="/Billing" component={Billing} />
                <Route path="/Billing/invoice/:id" component={InvoiceDetails} />
                <Route exact path="/Communications" component={Coms} />
                <Route
                  exact
                  path="/Communications/details/:id"
                  component={MessageDetails}
                />
                <Route path="/Communications/New/:id" component={NewMessage} />
                <Route path="/Communications/Sent" component={SentMessages} />
                <Route path="/Account/" component={Account} />
              {/* </AuthenticatedComponent>  */}

            </Switch>
            <Footer />
          </BrowserRouter>
        </main>
      </AppContext.Provider>
    );
  }
}
