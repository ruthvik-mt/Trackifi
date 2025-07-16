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

// src/context/AuthContext.ts
import { createContext } from "react";

export interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType // ✅ Safe for use without null-checks
);

