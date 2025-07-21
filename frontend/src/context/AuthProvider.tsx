// import { useState, useEffect } from "react";
// import { AuthContext } from "./AuthContext";
// import axios from "../axios";

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

//   // Set Authorization header on load (if token exists)
//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     }
//   }, [token]);

//   const login = async (email: string, password: string) => {
//     const res = await axios.post("/api/auth/login", { email, password });
//     const jwt = res.data.token;

//     setToken(jwt);
//     localStorage.setItem("token", jwt);
//     axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`; // ✅ set globally
//   };

//   const logout = () => {
//     setToken(null);
//     localStorage.removeItem("token");
//     delete axios.defaults.headers.common["Authorization"]; // ✅ remove on logout
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "../axios";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = async (email: string, password: string): Promise<void> => {
    const response = await axios.post("/api/auth/login", { email, password });

    const jwt = response.data.token as string;
    const refreshToken = response.data.refreshToken as string;

    setToken(jwt);
    localStorage.setItem("token", jwt);
    localStorage.setItem("refreshToken", refreshToken);

    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  };

  const logout = (): void => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    delete axios.defaults.headers.common["Authorization"];

    window.location.href = "/auth/login";
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
