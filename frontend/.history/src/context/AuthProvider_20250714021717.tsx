import { useState, useEffect } from "react";
import { AuthContext, User } from "./AuthContext";
import api from "../axios";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const res = await api.post<{ token: string }>("/auth/login", { email, password });
    const jwt = res.data.token;
    localStorage.setItem("token", jwt);
    setToken(jwt);

    const userRes = await api.get<User>("/users/me");
    setUser(userRes.data);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const res = await api.get<User>("/users/me");
        setUser(res.data);
      } catch {
        logout();
      }
    };

    fetchUser();
  }, [token]);

  // ✅ You can inline the context value without using a separate type
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
