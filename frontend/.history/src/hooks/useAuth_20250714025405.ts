// src/hooks/useAuth.ts
import { useContext } from "react";
import { AuthContext, AuthContextType } from "@/context/AuthContext";

/**
 * Convenience hook to access the AuthContext.
 * Provides: user, token, login(), logout().
 */
export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
