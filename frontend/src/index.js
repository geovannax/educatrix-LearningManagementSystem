import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Icons CSS
import "bootstrap-icons/font/bootstrap-icons.css";
// Cores css
import "./styles/colors.css";
// index CSS
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
