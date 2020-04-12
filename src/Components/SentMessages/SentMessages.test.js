import * as React from "react";
import * as ReactDOM from "react-dom";
import SentMessages from "./SentMessages.js";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");

 let userId = {userid:1}

  ReactDOM.render(
    <Router>
      <SentMessages {...userId} />,
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});