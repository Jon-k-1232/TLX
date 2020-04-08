import * as React from "react";
import * as ReactDOM from "react-dom";
import SentMessages from "src/Components/SentMessages/SentMessages.js";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <SentMessages />,
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
