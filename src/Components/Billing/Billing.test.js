import * as React from "react";
import * as ReactDOM from "react-dom";
import Billing from "./Billing.js";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Billing />, div);
  ReactDOM.unmountComponentAtNode(div);
});
