// import { createContext } from "react";
// import { User } from "@/types/Auth";

// export interface AuthContextType {
//   token: string | null;
//   user: User | null;
//   login: (token: string) => void;
//   logout: () => void;
// }

// export const AuthContext = createContext<AuthContextType>({
//   token: null,
//   user: null,
//   login: () => {},
//   logout: () => {},
// });

import { createContext, useState } from "react";
import axios from "../axios";

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const login = async (email: string, password: string) => {
    const res = await axios.post("/api/auth/login", { email, password });
    const jwt = res.data.token;
    setToken(jwt);
    localStorage.setItem("token", jwt);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
