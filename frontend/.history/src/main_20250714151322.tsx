// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./tailwind.css";

// import { BrowserRouter as Router } from "react-router-dom";
// import { AuthProvider } from "./context/AuthProvider";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <Router>
//       <AuthProvider>
//         <App />
//       </AuthProvider>
//     </Router>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./tailwind.css";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter as Router } from "react-router-dom"; // ✅ Add this

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router> {/* ✅ Wrap everything with Router */}
      import { ThemeProvider } from "./context/ThemeContext";
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
