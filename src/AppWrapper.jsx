import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import UserProvider from "./context/userContext";

const AppWrapper = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  );
};

export default AppWrapper;
