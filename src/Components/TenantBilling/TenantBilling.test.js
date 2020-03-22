import * as React from "react";
import * as ReactDOM from "react-dom";
import TenantBilling from "./TenantBilling.js";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<TenantBilling />, div);
    ReactDOM.unmountComponentAtNode(div);
});
