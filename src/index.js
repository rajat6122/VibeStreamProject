import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // for auth
import "./index2.css"; // for vibestream
import RootApp from "./RootApp";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>  
    <RootApp />
  </HashRouter>
);