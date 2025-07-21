import { createContext } from "react";

export interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  login: async () => {
    throw new Error("login function not initialized");
  },
  logout: () => {
    throw new Error("logout function not initialized");
  },
});
