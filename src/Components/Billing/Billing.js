import React from "react";
import "./Billing.css";
import PaymentHistoryBox from "../PaymentHistoryBox/PaymentHistoryBox.js"

export default class Billing extends React.Component {
  render() {
    return (
      <main className="billingPage">
        <h1>Billing</h1>
        <div className="balance">
          <h2>Balance</h2>
          <h3>$1000</h3>
          <p>Due March 1, 2020</p>
        </div>

        <div className="paymentHistory">
          <h3>Payment History</h3>
          <PaymentHistoryBox/>

        </div>
      </main>
    );
  }
}
