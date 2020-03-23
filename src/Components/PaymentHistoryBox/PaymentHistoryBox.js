import React from 'react';
import "./PaymentHistoryBox.css"

// Used to generate each overview box of payment invoice history in billing screen

export default function PaymentHistoryBox(props){

    return(
        <div className="paymentInvoiceHistory">
            <p>$</p>
            <p>Paid</p>
            <p>mm/dd/yy</p>
        </div>
    );

}