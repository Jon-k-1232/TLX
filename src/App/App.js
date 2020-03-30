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
        type: ""
      },
      contactInfo: {
        userId: "uXolWvg49Co5EfCo",
        company: "Bob Builder",
        street: "1232 w south street",
        city: "Scottsdale",
        state: "AZ",
        zip: "85308",
        email: "jon@BobBuilder.com",
        phone: "602-881-2412",
        role: "Tenant"
      },
      propertyInfo: {
        UserId: "23-19",
        company: "Monsters, Inc",
        street: "1345 N. Fake St.",
        city: "Phoenix",
        state: "Az",
        zip: "85254",
        phone: "123-456-7898",
        email: "Jake@AbcManagement.com"
      },
      messages: [
        {
          userId: "uXolWvg49Co5EfCo",
          messageId: "3",
          subjectId: "2",
          date: "3/12/20",
          to: "Monsters, Inc",
          from: "Bob Builder",
          subject: "This is a test of a subject that is the max",
          messageContent:
            'This is a test of a short message content. "Lorem ipsum dolor sit amet, consectetur ' +
            "adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim " +
            "veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute " +
            "irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
        },
        {
          userId: "uXolWvg49Co5EfCo",
          messageId: "2",
          subjectId: "2",
          date: "3/10/20",
          to: "Monsters, Inc",
          from: "Bob Builder",
          subject: "This is a test of a subject that is the max",
          messageContent: "test test"
        },
        {
          userId: "uXolWvgbui79",
          messageId: "1",
          subjectId: "1",
          date: "3/8/20",
          to: "Monsters, Inc",
          from: "Bob Builder",
          subject: "Another subject line test",
          messageContent:
            "This is a test of a slightly longer message. Text limits will have a 500 character limit."
        }
      ],
      bills: [
        {
          userId: "uXolWvg49Co5EfCo",
          billsId: "lnkbd7vferkc94323f",
          rentFor: "April 2020",
          due: "$1200",
          dueDate: "April 1, 2020",
          status: "Outstanding",
          paidAmount: "$0",
          paidDate: "",
          paidWith: "",
          maintenance: "$300",
          water: "$100",
          pastDue: "0.00",
          rent: "$800"
        },
        {
          userId: "uXolWvg49Co5EfCo",
          billsId: "knjsvd9s69s8dv09",
          rentFor: "March 2020",
          due: "$1300",
          dueDate: "March 1, 2020",
          status: "Paid",
          paidAmount: "$1300",
          paidDate: "February 1, 2020",
          paidWith: "Check",
          maintenance: "$300",
          water: "$200",
          pastDue: "0.00",
          rent: "$800"
        }
      ],
      setContactInfo: company => {
        this.setState({ contactInfo: company });
      },
      setUser: userInfo => {
        this.setState({ user: userInfo });
      },
      setMessage: message => {
        let arr = [...this.state.messages];
        arr.unshift(message);
        this.setState({ messages: arr });
      },
      setResetPassword: password => {
        this.setState({ user: password });
      }
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
                <Route path="/Account" component={Account} />
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
