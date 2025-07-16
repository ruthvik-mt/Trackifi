import { createContext } from "react";

/** Shape returned by GET /api/users/me */
export interface User {
  id: number;
  email: string;
  // add any extra fields you return from the backend
}

export interface AuthContextType {
  /** JWT access-token (or null if logged out) */
  token: string | null;
  /** Currently-logged-in user (or null while loading / logged out) */
  user: User | null;
  /** Log in, set token, and fetch /users/me */
  login: (email: string, password: string) => Promise<void>;
  /** Clear token & user and log out */
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
