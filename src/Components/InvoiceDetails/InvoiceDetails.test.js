import * as React from "react";
import * as ReactDOM from "react-dom";
import InvoiceDetails from "./PaymentHistoryBox.js";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<InvoiceDetails />, div);
    ReactDOM.unmountComponentAtNode(div);
});