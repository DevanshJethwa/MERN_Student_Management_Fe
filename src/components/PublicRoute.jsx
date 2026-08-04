import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  const roleId = localStorage.getItem("roleId");

  if (!token) {
    return children;
  }

  if (roleId === "1") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (roleId === "2") {
    return <Navigate to="/school-admin/dashboard" replace />;
  }

  return children;
}

export default PublicRoute;