import * as React from "react";
import * as ReactDOM from "react-dom";
import Coms from "./Coms.js";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <Coms />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
