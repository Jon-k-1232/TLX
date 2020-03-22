import * as React from "react";
import * as ReactDOM from "react-dom";
import TenentAccount from "./TenantAccount.js.js";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<TenentAccount />, div);
    ReactDOM.unmountComponentAtNode(div);
});
