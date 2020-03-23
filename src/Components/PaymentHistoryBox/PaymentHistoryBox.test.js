import * as React from "react";
import * as ReactDOM from "react-dom";
import PaymentHistoryBox from "./PaymentHistoryBox.js";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<PaymentHistoryBox />, div);
    ReactDOM.unmountComponentAtNode(div);
});