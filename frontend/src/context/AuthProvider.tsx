import { useEffect, useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { login as loginApi } from "../api/auth";
import axios from "../axios";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  // Automatically attach token to axios headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.debug("[Auth] Token set in axios headers");
    } else {
      delete axios.defaults.headers.common["Authorization"];
      console.debug("[Auth] Token removed from axios headers");
    }
  }, [token]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.warn("[Auth] Token expired or invalid. Logging out.");
          logout();
          window.location.href = "/auth/login"; // or use navigate()
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

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

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    console.debug("[Auth] Logged out, token cleared");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
