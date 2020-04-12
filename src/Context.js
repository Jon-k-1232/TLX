import React from "react";

const AppContext = React.createContext({
  messages: [],
  bills:[],
  contactInfo:{},
  managerInfo: {},
  inboxMessages: [],
});

export default AppContext;
