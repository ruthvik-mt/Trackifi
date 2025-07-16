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

import { createContext, useContext, useEffect, useState } from "react";
import { LoginResponse, User } from "../types/Auth";
import { getCurrentUser } from "../api/user";

interface AuthContextType {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      getCurrentUser()
        .then(setUser)
        .catch(() => {
          setToken(null);
          localStorage.removeItem("token");
        });
    }
  }, [token]);

  const handleSetToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) localStorage.setItem("token", newToken);
    else localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, user, setToken: handleSetToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

