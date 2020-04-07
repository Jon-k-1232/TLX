import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "../Components/Register/Register.js";
import MessageHistory from "../Components/MessageHistory/MessageHistory.js";
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
import LoggedOut from "../Components/LoggedOut/LoggedOut.js";

export default class App extends React.Component {
  constructor() {
    super();
    // state is being set in order to mimic api data inbound.
    this.state = {
      user: {
        userId: "uXolWvg49Co5EfCo",
        username: "",
        password: "",
        type: "Tenant",
      },
      contactInfo: {},
      managerInfo: {},
      messages: [],
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

              {this.state.user.type === "Tenant" ? (
                <Route exact path="/Billing" component={Billing} />
              ) : (
                <LoggedOut />
              )}

              {this.state.user.type === "Tenant" ? (
                <Route path="/Billing/invoice/:id" component={InvoiceDetails} />
              ) : (
                <LoggedOut />
              )}

              {this.state.user.type === "Tenant" ? (
                <Route exact path="/Communications" component={Coms} />
              ) : (
                <LoggedOut />
              )}

              {this.state.user.type === "Tenant" ? (
                <Route
                  exact
                  path="/Communications/details/:id"
                  component={MessageDetails}
                />
              ) : (
                <LoggedOut />
              )}

              {this.state.user.type === "Tenant" ? (
                <Route path="/Communications/New/:id" component={NewMessage} />
              ) : (
                <LoggedOut />
              )}

              {this.state.user.type === "Tenant" ? (
                <Route
                  path="/Communications/History"
                  component={MessageHistory}
                />
              ) : (
                <LoggedOut />
              )}

              {this.state.user.type === "Tenant" ? (
                <Route path="/Account/" component={Account} />
              ) : (
                <LoggedOut />
              )}
            </Switch>
            <Footer />
          </BrowserRouter>
        </main>
      </AppContext.Provider>
    );
  }
}
