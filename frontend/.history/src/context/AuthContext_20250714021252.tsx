// src/context/AuthContext.tsx

import { createContext } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
