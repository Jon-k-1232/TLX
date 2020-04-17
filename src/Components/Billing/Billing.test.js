import * as React from "react";
import * as ReactDOM from "react-dom";
import Billing from "./Billing.js";

it("renders without crashing", () => {
  const div = document.createElement("div");

  let userId = { userid: 1 };

  ReactDOM.render(<Billing {...userId} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
