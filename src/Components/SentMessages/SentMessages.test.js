import * as React from "react";
import * as ReactDOM from "react-dom";
import SentMessages from "./SentMessages.js";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");

  const arr = {
    messageid: 1,
    date: "12/12/12",
    to: "bob",
    toUserId: 1,
    from: "manager",
    fromUserId: 2,
    subject: "test",
    subjectId: 1,
    messageContent: "test",
    groupId: 1,
  };

  ReactDOM.render(
    <Router>
      <SentMessages {...arr} />,
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});


/*
  const props = [{
    messageid: 1,
    date: "12/12/12",
    to: "bob",
    toUserId: 1,
    from: "manager",
    fromUserId: 2,
    subject: "test",
    subjectId: 1,
    messageContent: "test",
    groupId: 1,
  }];

 */