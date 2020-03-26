import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Register from "../Components/Register/Register.js";
import MessageHistory from "../Components/MessageHistory/MessageHistory.js";
import NewMessage from "../Components/NewMessage/NewMessage.js";
import Footer from "../Components/Footer/Footer.js";
import Header from "../Components/Header/Header.js";
import Account from "../Components/Account/Account.js";
import Coms from "../Components/Coms/Coms.js";
import SignIn from "../Components/SignIn/SignIn.js";
import Billing from "../Components/Billing/Billing.js";
import MessageDetails from "../Components/MessageDetails/MessageDetails.js";
import AppContext from "../Context.js";
import LoggedOut from "../Components/LoggedOut/LoggedOut.js";

export default class App extends React.Component {
  constructor() {
    super();
    // state is being set in order to mimic api data inbound.
    this.state = {
      user:{
        username: null,
        password: null,
        type: null,
      },
      contactInfo: {
        company: "bob",
        street: "1232 w south street",
        city: "scottsdale",
        state: "AZ",
        zip: "85308",
        email: "jon@jon.com",
        phone: "6028812412"
      },
      propertyManager: "ABC Management",
      messages: [
        {
          userId: "uXolWvg49Co5EfCo",
          messageId: "jndicbuwc87adc78vds",
          date: "3/12/20",
          to: "Jon Kimmel",
          from: "Property Manager",
          subject: "This is the subject line. This is a test of a longer",
          messageContent:
            'This is a test of a short message content. "Lorem ipsum dolor sit amet, consectetur ' +
            "adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim " +
            "veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute " +
            "irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
        },
        {
          userId: "uXolWvg49Co5EfCo",
          messageId: "jndics7sc8scs",
          date: "3/10/20",
          to: "Property Manager",
          from: "Jon",
          subject: "This is the subject line. This is a test of a longer",
          messageContent: "test test"
        },
        {
          userId: "uXolWvgbui79",
          messageId: "jndicbuwc87a12342",
          date: "3/8/20",
          to: "Jon Kimmel",
          from: "Property Manager",
          subject: "Another subject line test",
          messageContent:
            "This is a test of a slightly longer message. Text limits will have a 500 character limit."
        }
      ],
      setContactInfo: company => {
        this.setState({ contactInfo: company });
      },
      setUser: userInfo => {
        this.setState({ user: userInfo });
      }
    };
  }




  saveUser(newUser){
    localStorage.setItem("user", newUser.username);
    this.setState({ user:newUser });
  }

  logout(){
    localStorage.clear();
    this.setState({ user:null });
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
                <Route path="/Billing" component={Billing}/>
              ) : <LoggedOut/>}

              {this.state.user.type === "Tenant" ? (
                <Route exact path="/Communications" component={Coms} />
              ) : <LoggedOut/>}

              {this.state.user.type === "Tenant" ? (
                <Route
                exact
                path="/Communications/details/:id"
                component={MessageDetails}
                />
              ) : <LoggedOut/>}

              {this.state.user.type === "Tenant" ? (
                <Route path="/Communications/New" component={NewMessage} />
              ) : <LoggedOut/>}

              {this.state.user.type === "Tenant" ? (
                <Route
                path="/Communications/History"
                component={MessageHistory}
                />
              ) : <LoggedOut/>}

              {this.state.user.type === "Tenant" ? (
                <Route path="/Account" component={Account} />
              ) : <LoggedOut/>}

            </Switch>
            <Footer />
          </BrowserRouter>
        </main>
      </AppContext.Provider>
    );
  }
}













/*

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
              <Route
                exact
                path="/Communications/details/:id"
                component={MessageDetails}
              />
              <Route path="/Communications/New" component={NewMessage} />
              <Route
                path="/Communications/History"
                component={MessageHistory}
              />
              {this.state.user.username.type === "Tenant" ? (
                <Route path="/Account" component={Account} />
              ) : (
                <Route path="/Account" component={ManagerAccount} />
              )}
<Route path="/Account" component={Account} />
</Switch>
<Footer />
</BrowserRouter>
</main>
</AppContext.Provider>
);
}
}


 */