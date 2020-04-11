import React from "react";
import "./Billing.css";
import { Link } from "react-router-dom";
import config from "../../config.js";
import AppContext from "../../Context.js";

// Billing page

export default class Billing extends React.Component {
  static contextType = AppContext;

  componentDidMount() {
    const userId = this.context.contactInfo.userid;

    fetch(`${config.API_ENDPOINT}/contacts/data/${userId}`, {
      method: "GET",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then((data) => {
        this.context.setManagerInfo(data.userManagerInfo[0]);
      })
      .catch((error) => {
        alert(error);
      });

    // Gets user bills
    fetch(`${config.API_ENDPOINT}/bills/${userId}`, {
      method: "GET",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then((data) => {
        this.context.setBillsInfo(data.userBills);
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    let currentBill = this.context.bills[0];
    let bills = this.context.bills;
    let billingHistory = [];

    /*
       This function will generate each quick view billing box. Additionally it contains conditional
       rendering for if there is a history or not and then also if the bill has been paid or not.
       */
    if (bills <= 0) {
      billingHistory.push(
        <div className="noPaymentsHistory">
          <p> No history</p>
        </div>
      );
    } else {
      for (let i = 0; i < bills.length; i++) {
        billingHistory.push(
          <div className="paymentsContainer" key={i}>
            <div className="paymentInvoiceHistory">
              <div className="quickViewOutstanding">
                <h4>Status:</h4>
                <div>
                  <p>{bills[i].status}</p>
                </div>
              </div>

              <div className="quickViewRentFor">
                <h4>Rent For:</h4>
                <div>
                  <p>{bills[i].rentFor}</p>
                </div>
              </div>

              {/*
                 Conditional to either display the paid amount, or amount due in billing quick view
              */}
              {bills[i].status === "Outstanding" ? (
                <div className="quickViewPaid">
                  <h4>Due:</h4>
                  <div>
                    <p>${bills[i].totalDue}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="quickViewPaid">
                    <h4>Paid:</h4>
                    <div>
                      <p>${bills[i].amountPaid}</p>
                    </div>
                  </div>

                  <div className="quickViewPaidBy">
                    <h4>Paid By:</h4>
                    <div>
                      <p>{bills[i].paidWith}</p>
                    </div>
                  </div>

                  <div className="quickViewPaidOn">
                    <h4>Paid On:</h4>
                    <div>
                      <p>{bills[i].paidDate}</p>
                    </div>
                  </div>
                </div>
              )}

              <Link to={`/Billing/invoice/${bills[i].billId}`}>
                <p id="billingViewDetails">View Details</p>
              </Link>
            </div>
          </div>
        );
      }
    }

    return currentBill ? (
      <main className="billingPage">
        <h1>Billing</h1>
        <div className="balance">
          <h2>Balance</h2>
          <h3>${currentBill.totalDue}</h3>
          <p>Due {currentBill.dueDate}</p>
        </div>

        <div className="paymentHistory">
          <h3>Payment History</h3>
        </div>

        {billingHistory}
      </main>
    ) : (
      ""
    );
  }
}
