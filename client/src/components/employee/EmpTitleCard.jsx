import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        className="rounded-xl shadow-lg p-4 mb-5 flex justify-between items-center mx-6 mt-6"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center gap-6">
          <span className="h-20 w-20 rounded-full border-2 border-blue-500 bg-blue-50 text-blue-700 font-bold text-5xl flex items-center justify-center shrink-0">
            {profileLetter}
          </span>
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
              {finalName} <span className="text-4xl">👋</span>
            </h1>
            <p className="text-lg text-indigo-100">{user?.email || "employee@staffsphere.com"}</p>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-25 h-10 flex justify-center items-center rounded-lg border-2 border-red-200 text-red-600 bg-red-100 px-4 text-sm font-semibold transition-colors gap-2 disabled:opacity-70"
          >
            {isLoggingOut ? "Logging out..." : "Log Out"}
          </button>
          {errorMessage ? (
            <p className="text-xs text-red-100">{errorMessage}</p>
          ) : null}
        </div>
      </div>
  );
};

export default EmpTitleCard;