import React from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";
import billing from "../Images/billing.png";
import communication from "../Images/communication.png";
import handShake from "../Images/handShake.png";

/*
 Main Welcome Page.
 */
export default class MainPage extends React.Component {
  render() {
    return (
      <main className="mainPage">
        <h2>Tenant Landlord Exchange</h2>
        <div className="homeCall">
          <Link to="/Sign-in">
            <div>
              <img src={billing} alt="billing icon" />
              <h3>Better Statements</h3>
            </div>
          </Link>

          <Link to="/Sign-in">
            <div>
              <img src={communication} alt="message icon" />
              <h3>Better Communication</h3>
            </div>
          </Link>
          <Link to="/Sign-in">
            <div>
              <img src={handShake} alt="message icon" />
              <h3>Better Relations</h3>
            </div>
          </Link>
        </div>
      </main>
    );
  }
}
