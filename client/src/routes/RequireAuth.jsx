import { Navigate, useLocation } from "react-router-dom";

const getStoredUser = () => {
  const storedUser = localStorage.getItem("staffsphereUser");

  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("staffsphereUser");
    return null;
  }
};

const RequireAuth = ({ children, allowedRoles }) => {
  const location = useLocation();
  const user = getStoredUser();

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user.role)) {
    const fallbackPath = user.role === "HR" ? "/hr/dashboard" : "/employee/dashboard";
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};

export default RequireAuth;
