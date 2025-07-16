import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./tailwind.css"; // Make sure this contains Tailwind base styles
import { AuthProvider } from "./context/AuthProvider";

// Attach React to the #root element in index.html
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
