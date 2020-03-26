import * as React from "react";
import * as ReactDOM from "react-dom";
import LoggedOut from "./LoggedOut.js";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <Router>
            <LoggedOut />
        </Router>,
        div);
    ReactDOM.unmountComponentAtNode(div);
});