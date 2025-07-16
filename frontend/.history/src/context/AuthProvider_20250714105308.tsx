// import { ReactNode, useCallback, useEffect, useState } from "react";
// import { AuthContext } from "./AuthContext";
// import { User } from "@/types/Auth";
// import { getCurrentUser } from "@/api/user";
// import { useNavigate } from "react-router-dom";

// interface Props {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: Props) => {
//   const [token, setToken] = useState<string | null>(() =>
//     localStorage.getItem("token")
//   );
//   const [user, setUser] = useState<User | null>(null);
//   const navigate = useNavigate();

//   const logout = useCallback(() => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setUser(null);
//     navigate("/login");
//   }, [navigate]);

//   const fetchUser = useCallback(async () => {
//     try {
//       const userData = await getCurrentUser();
//       setUser(userData);
//     } catch (err) {
//       console.error("Failed to fetch user:", err);
//       logout();
//     }
//   }, [logout]);

//   const login = useCallback(
//     (newToken: string) => {
//       localStorage.setItem("token", newToken);
//       setToken(newToken);
//       fetchUser();
//     },
//     [fetchUser]
//   );

//   useEffect(() => {
//     if (token) {
//       fetchUser();
//     }
//   }, [token, fetchUser]);

//   return (
//     <AuthContext.Provider value={{ token, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "../axios";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  // Set Authorization header on load (if token exists)
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await axios.post("/api/auth/login", { email, password });
    const jwt = res.data.token;

    setToken(jwt);
    localStorage.setItem("token", jwt);
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`; // ✅ set globally
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"]; // ✅ remove on logout
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

