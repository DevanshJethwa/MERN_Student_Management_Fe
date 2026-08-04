import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const roleId = localStorage.getItem("roleId");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roleId !== allowedRole) {
    if (roleId === "1") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (roleId === "2") {
      return <Navigate to="/school-admin/dashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;