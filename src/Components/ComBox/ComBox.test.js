import * as React from "react";
import * as ReactDOM from "react-dom";
import ComBox from "./ComBox.js";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ComBox />, div);
  ReactDOM.unmountComponentAtNode(div);
});
