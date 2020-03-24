import * as React from "react";
import * as ReactDOM from "react-dom";
import Account from "./Account.js";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Account />, div);
  ReactDOM.unmountComponentAtNode(div);
});
