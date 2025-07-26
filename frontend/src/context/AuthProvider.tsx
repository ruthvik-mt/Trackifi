// // import { useState, useEffect } from "react";
// // import { AuthContext } from "./AuthContext";
// // import axios from "../axios";

// // export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
// //   const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

// //   // Set Authorization header on load (if token exists)
// //   useEffect(() => {
// //     if (token) {
// //       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// //     }
// //   }, [token]);

// //   const login = async (email: string, password: string) => {
// //     const res = await axios.post("/api/auth/login", { email, password });
// //     const jwt = res.data.token;

// //     setToken(jwt);
// //     localStorage.setItem("token", jwt);
// //     axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`; // ✅ set globally
// //   };

// //   const logout = () => {
// //     setToken(null);
// //     localStorage.removeItem("token");
// //     delete axios.defaults.headers.common["Authorization"]; // ✅ remove on logout
// //   };

// //   return (
// //     <AuthContext.Provider value={{ token, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// import React, { useState, useEffect } from "react";
// import { AuthContext } from "./AuthContext";
// import axios from "../axios"; // Your custom axios instance
// import { isAxiosError } from "axios"; // Import isAxiosError separately from axios package
// import { useNavigate } from "react-router-dom";

// interface AuthProviderProps {
//   children: React.ReactNode;
// }

// interface LoginResponse {
//   accessToken: string;
//   refreshToken: string;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     } else {
//       delete axios.defaults.headers.common["Authorization"];
//     }
//   }, [token]);

//   const login = async (email: string, password: string): Promise<void> => {
//     try {
//       const response = await axios.post<LoginResponse>("/auth/login", { email, password });

//       const { accessToken, refreshToken } = response.data;

//       if (!accessToken || accessToken.split(".").length !== 3) {
//         throw new Error("Invalid token format received.");
//       }

//       setToken(accessToken);
//       localStorage.setItem("token", accessToken);
//       localStorage.setItem("refreshToken", refreshToken);

//       axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

//       navigate("/dashboard");
//     } catch (error: unknown) {
//       if (isAxiosError(error) && error.response?.data?.message) {
//         alert("Login failed: " + error.response.data.message);
//       } else if (error instanceof Error) {
//         alert("Login failed: " + error.message);
//       } else {
//         alert("Login failed: An unknown error occurred.");
//       }
//       console.error("Login failed:", error);
//     }
//   };

//   const logout = (): void => {
//     setToken(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("refreshToken");
//     delete axios.defaults.headers.common["Authorization"];
//     navigate("/auth/login");
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { useEffect, useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { login as loginApi } from "../api/auth";
import axios from "../axios";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token"); // Load token from localStorage
  });

  // Attach token to axios on token change
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.debug("[Auth] Token set in axios headers");
    } else {
      delete axios.defaults.headers.common["Authorization"];
      console.debug("[Auth] Token removed from axios headers");
    }
  }, [token]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await loginApi({ email, password });

      const accessToken = response.accessToken;
      if (!accessToken) {
        throw new Error("No access token received from server.");
      }

      setToken(accessToken);
      localStorage.setItem("token", accessToken);

      console.debug("[Auth] Login successful, token stored");
    } catch (error) {
      console.error("[Auth] Login failed:", error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    console.debug("[Auth] Logged out, token cleared");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
