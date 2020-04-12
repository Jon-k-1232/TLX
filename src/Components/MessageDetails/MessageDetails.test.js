import * as React from "react";
import * as ReactDOM from "react-dom";
import MessageDetails from "./MessageDetails.js";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const subjectId={
    subjectId: 1
  }

  ReactDOM.render(<MessageDetails{...subjectId} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
