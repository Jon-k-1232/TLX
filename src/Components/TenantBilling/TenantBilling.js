import React from 'react';
import "./TenantBilling.css"

export default class TenantBilling extends React.Component {

    render() {

        return(
            <main className='billingPage'>
                <h1>Billing</h1>
                    <div className='balance'>
                        <h2>Balance</h2>
                        <h3>$1000</h3>
                        <p>Due March 1, 2020</p>
                    </div>

                <div className='paymentHistory'>
                    <h3>Payment History</h3>
                    <div className='boxOne'>
                        <p>$</p>
                        <p>Paid</p>
                        <p>mm/dd/yy</p>
                    </div>

                    <div className='boxTwo'>
                        <p>$</p>
                        <p>Paid</p>
                        <p>mm/dd/yy</p>
                    </div>

                    <div className='boxThree'>
                        <p>$</p>
                        <p>Paid</p>
                        <p>mm/dd/yy</p>
                    </div>
                </div>

            </main>
        );
    }
}