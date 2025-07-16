// src/context/AuthProvider.tsx
import { ReactNode, useCallback, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "@/types/Auth";
import { getCurrentUser } from "@/api/user";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
  }, [navigate]);

  const fetchUser = useCallback(async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      logout(); // Token might be invalid
    }
  }, [logout]);

  const login = useCallback(
    (newToken: string) => {
      localStorage.setItem("token", newToken);
      setToken(newToken);
      fetchUser();
    },
    [fetchUser]
  );

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token, fetchUser]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
