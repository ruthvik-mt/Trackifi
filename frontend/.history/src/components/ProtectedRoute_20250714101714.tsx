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
import { AuthContext } from "../context/AuthContext";
import { JSX } from "react/jsx-runtime";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token } = AuthContext();

  if (!token) return <Navigate to="/login" replace />;
  return children;
}
