import { useState, useEffect } from "react";
import { AuthContext, User, AuthContextType } from "./AuthContext";
import api from "../axios";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // ✅ Remove duplicate /api
    const { data } = await api.post("/auth/login", { email, password });
    const jwt = data.token;

    setToken(jwt);
    localStorage.setItem("token", jwt);

    // ✅ Remove duplicate /api
    const userRes = await api.get<User>("/users/me");
    setUser(userRes.data);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const loadUser = async () => {
      if (!token) return;

      try {
        const res = await api.get<User>("/users/me");
        setUser(res.data);
      } catch {
        logout();
      }
    };
    loadUser();
  }, [token]);

  const contextValue: AuthContextType = { token, user, login, logout };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
