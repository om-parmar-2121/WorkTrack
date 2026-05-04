import { Navigate, useLocation } from "react-router-dom";

const decodeBase64Url = (value) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4;
  const padded = padding ? normalized + "=".repeat(4 - padding) : normalized;
  return atob(padded);
};

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;

    const payload = JSON.parse(decodeBase64Url(parts[1]));
    if (!payload?.exp) return false;

    return payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
};

const getStoredUser = () => {
  const storedUser = localStorage.getItem("staffsphereUser");

  if (!storedUser) return null;

  try {
    const user = JSON.parse(storedUser);

    if (isTokenExpired(user?.token)) {
      localStorage.removeItem("staffsphereUser");
      return null;
    }

    return user;
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
