import * as React from "react";
import * as ReactDOM from "react-dom";
import MessageHistory from "./MessageHistory.js";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <MessageHistory />,
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
