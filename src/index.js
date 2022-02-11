import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Layout from "./Layout";
import Amplify from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);

// import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
  document.getElementById("root")
);
