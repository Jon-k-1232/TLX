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
              <p>Better Statements</p>
            </div>
          </Link>

          <Link to="/Sign-in">
            <div>
              <img src={communication} alt="message icon" />
              <p>Better Communication</p>
            </div>
          </Link>
          <Link to="/Sign-in">
            <div>
              <img src={handShake} alt="message icon" />
              <p>Better Relations</p>
            </div>
          </Link>
        </div>
        <h2 id="callToAction"> <Link to="/Sign-in">Get started now!</Link></h2>
      </main>
    );
  }
}
