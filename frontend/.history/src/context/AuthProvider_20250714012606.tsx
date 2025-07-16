// context/AuthProvider.tsx
import { useState, useEffect } from "react";
import { AuthContext, AuthContextType, User } from "./AuthContext";
import api from "../api/axios";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    const newToken = res.data.token;

    localStorage.setItem("token", newToken);
    setToken(newToken);

    // Fetch the current user
    const userRes = await api.get("/users/me");
    setUser(userRes.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // Load user if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const userRes = await api.get("/users/me");
          setUser(userRes.data);
        } catch {
          logout();
        }
      }
    };
    loadUser();
  }, [token]);

  const value: AuthContextType = { token, user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
