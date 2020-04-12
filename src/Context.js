import React from "react";

const AppContext = React.createContext({
  contactInfo: {},
  managerInfo: {},
  messages: [],
  inboxMessages: [],
  sentMessages: [],
  bills: [],
});

export default AppContext;
