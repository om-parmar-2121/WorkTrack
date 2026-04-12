import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import Background from "../../assets/images/HrNameBackground.jpg";
import { logoutUser } from "../../services/authService";

const EmpTitleCard = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const storedUser = localStorage.getItem("staffsphereUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const role = user?.role;
  const nameSource = user?.employeeFullName || "Employee";
  const profileLetter = nameSource.charAt(0).toUpperCase();

  const displayName = nameSource
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  const finalName = displayName || (role === "HR" ? "HR Manager" : "Employee");

  const handleLogout = async () => {
    setErrorMessage("");
    setIsLoggingOut(true);

    try {
      await logoutUser();
      localStorage.removeItem("staffsphereUser");
      navigate("/", { replace: true });
    } catch (error) {
      setErrorMessage(error.message || "Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div
        className="relative mx-3 mt-3 mb-4 flex flex-col gap-4 rounded-xl p-4 shadow-lg md:mx-6 md:mt-6 md:mb-5 md:flex-row md:items-center md:justify-between"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center gap-3 md:gap-6">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-blue-500 bg-blue-50 text-3xl font-bold text-blue-700 md:h-20 md:w-20 md:text-5xl">
            {profileLetter}
          </span>
          <div className="min-w-0 text-white">
            <h1 className="mb-1 flex items-center gap-2 text-2xl font-bold md:mb-2 md:text-4xl">
              {finalName} <span className="text-2xl md:text-4xl">👋</span>
            </h1>
            <p className="truncate text-sm text-indigo-100 md:text-lg">{user?.email || "employee@staffsphere.com"}</p>
          </div>
        </div>

        <div className="absolute right-3 top-3 flex flex-col items-end gap-1 md:right-4 md:top-4">
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            aria-label={isLoggingOut ? "Logging out" : "Log out"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-red-100 text-red-600 transition-colors disabled:opacity-70 md:h-9 md:w-auto md:gap-1.5 md:px-3 md:text-sm"
          >
            <span className="hidden md:inline">
              {isLoggingOut ? "Logging out..." : "Log Out"}
            </span>
            <LogOut className="h-4 w-4" />
          </button>
          {errorMessage ? (
            <p className="text-xs text-red-100">{errorMessage}</p>
          ) : null}
        </div>
      </div>
  );
};

export default EmpTitleCard;