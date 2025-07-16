import { createContext } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
}

// You can inline the context type here if desired:
export const AuthContext = createContext<{
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
} | null>(null);
