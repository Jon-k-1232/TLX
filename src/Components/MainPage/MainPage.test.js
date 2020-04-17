import * as React from "react";
import * as ReactDOM from "react-dom";
import MainPage from "./MainPage.js";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <MainPage />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
