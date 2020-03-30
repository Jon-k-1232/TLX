import * as React from "react";
import * as ReactDOM from "react-dom";
import MessageDetails from "./MessageDetails.js";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MessageDetails />, div);
  ReactDOM.unmountComponentAtNode(div);
});
