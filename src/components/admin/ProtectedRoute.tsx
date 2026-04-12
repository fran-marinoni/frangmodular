import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/adminAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
