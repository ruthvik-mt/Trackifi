// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./tailwind.css";

// import { BrowserRouter as Router } from "react-router-dom";
// import { AuthProvider } from "./context/AuthProvider";
// import { ThemeProvider } from "./context/ThemeProvider";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <Router>
//       <ThemeProvider>
//         <AuthProvider>
//           <App />
//         </AuthProvider>
//       </ThemeProvider>
//     </Router>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "./tailwind.css";

import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Define your route configuration
const router = createBrowserRouter([
  {
    path: "*", // catch-all path for SPA
    element: (
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    ),
  },
]);

// Render the app
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
