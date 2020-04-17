import React from "react";
import "./InvoiceDetails.css";
import { Link } from "react-router-dom";
import AppContext from "../../Context.js";

// Invoice details page

export default class InvoiceDetails extends React.Component {
  static contextType = AppContext;

  render() {
    // reads the passed prop and finds the matching ID in the bills array.
    let bills = this.context.bills.find(
      (res) => res.billId === parseInt(this.props.match.params.id)
    );

    let company = this.context.contactInfo;
    let manager = this.context.managerInfo;

    return bills ? (
      <main className="invoicePage">
        <h1>Invoice</h1>

        <p id="backLink">
          <Link to="/Billing">Back</Link>
        </p>

        {/*
        Amount due overview
        */}
        <div className="billDueContainer">
          <h3>Invoice: {bills.rentFor}</h3>
          <h4>Pay: ${bills.totalDue}</h4>
          <h4>Due: {bills.dueDate}</h4>
        </div>

        {/*
        Make Payments to.
        */}
        <div className="makePaymentTo">
          <h3>Make payment to:</h3>
          <h4>{manager.company}</h4>
          <p>{manager.street}</p>
          <p>
            {manager.city}, {manager.state} {manager.zip}
          </p>
        </div>

        {/*
        Invoice to.
        */}
        <div className="billToContainer">
          <h3>Bill to:</h3>
          <h4>{company.company}</h4>
          <p>{company.street}</p>
          <p>
            {company.city}, {company.state} {company.zip}
          </p>
        </div>

        {/*
          Invoice Details.
        */}
        <h2>Invoice Details</h2>

        <div className="invoiceDetailsContainer">
          <div className="invoiceDetailsMaintenance">
            <p>Maintenance:</p>
            <div>
              <p>${bills.maintenance}</p>
            </div>
          </div>

          <div className="invoiceDetailsWater">
            <p>Water:</p>
            <div>
              <p>${bills.water}</p>
            </div>
          </div>

          <div className="invoiceDetailsRent">
            <p>Rent:</p>
            <div>
              <p>${bills.basicRent}</p>
            </div>
          </div>

          <div className="invoiceDetailsPast">
            <p>Past due:</p>
            <div>
              <p>${bills.pastDue}</p>
            </div>
          </div>

          <div className="invoiceDetailsTotal">
            <h4>Total:</h4>
            <div>
              <h4>${bills.totalDue}</h4>
            </div>
          </div>
        </div>

        {/*
          Conditionally rendering Payment Details Box based on if the bill is paid or outstanding.
        */}

        {bills.status === "Outstanding" ? (
          <div>
            <h2>Payment Details</h2>

            <div className="billIsPaid">
              <div className="paidStatus">
                <p>Status:</p>
                <div>
                  <p>{bills.status}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2>Payment Details</h2>

            <div className="billIsPaid">
              <div>
                <div className="paidStatus">
                  <p>Status:</p>
                  <div>
                    <p>{bills.status}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="paidDate">
                  <p>Paid On:</p>
                  <div>
                    <p>{bills.paidDate}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="paidAmount">
                  <p>Amount Paid:</p>
                  <div>
                    <p>{bills.amountPaid}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="paidWith">
                  <p>Payment Method:</p>
                  <div>
                    <p>{bills.paidWith}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    ) : (
      ""
    );
  }
}
