import { useState, useEffect } from "react";
import { AuthContext, User, AuthContextType } from "./AuthContext";
import api from "../axios";

/**
 * Wrap your entire app with <AuthProvider> in main.tsx / index.tsx:
 *   <AuthProvider>
 *     <App />
 *   </AuthProvider>
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  /** Persist token in localStorage so refresh keeps the session */
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);

  /** Call on login form submit */
  const login = async (email: string, password: string) => {
    // 1) Authenticate & receive JWT
    const { data } = await api.post("/api/auth/login", { email, password });
    const jwt = data.token;

    // 2) Store token in both state & localStorage
    setToken(jwt);
    localStorage.setItem("token", jwt);

    // 3) Immediately fetch the logged-in user
    const userRes = await api.get<User>("/api/users/me");
    setUser(userRes.data);
  };

  /** Clear state + localStorage and optionally redirect elsewhere */
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  /** If a token already exists (page refresh), fetch the user once */
  useEffect(() => {
    const loadUser = async () => {
      if (!token) return;

      try {
        const res = await api.get<User>("/api/users/me");
        setUser(res.data);
      } catch {
        // token no longer valid
        logout();
      }
    };
    loadUser();
  }, [token]); // run whenever token changes

  /* Context value exposed to the rest of the app */
  const contextValue: AuthContextType = { token, user, login, logout };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
