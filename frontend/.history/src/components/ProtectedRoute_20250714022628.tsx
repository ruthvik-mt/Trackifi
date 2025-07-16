import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * Wrap this around any page route that should be accessible only after login
 */
export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();

  // If no token is set, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
