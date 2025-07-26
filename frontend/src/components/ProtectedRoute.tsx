// // src/components/ProtectedRoute.tsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";
// import { ReactNode } from "react";

// const ProtectedRoute = ({ children }: { children: ReactNode }) => {
//   const { token } = useAuth();
//   return token ? <>{children}</> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { JSX, useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    setChecking(false);
  }, [token]);

  if (checking) return null; // Wait until token is checked

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}


