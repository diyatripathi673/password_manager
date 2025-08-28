import { StrictMode } from "react";
import React from "react"; // 👈 this line missing ho to error aayega

import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
