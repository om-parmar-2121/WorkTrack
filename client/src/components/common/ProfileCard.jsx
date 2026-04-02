import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/authService';
import { getMyEmployeeProfile } from '../../services/employeeService';

const ProfileCard = () => {
  const navigate = useNavigate();
  const [isLogOut, setIsLogOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [employeeFullName, setEmployeeFullName] = useState("");
  const storedUser = localStorage.getItem("staffsphereUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const loadName = async () => {
      if (user?.employeeFullName) {
        setEmployeeFullName(user.employeeFullName);
        return;
      }

      try {
        const employee = await getMyEmployeeProfile();
        const fullName = employee?.fullName || "";
        if (!fullName) return;

        setEmployeeFullName(fullName);
        localStorage.setItem(
          "staffsphereUser",
          JSON.stringify({ ...user, employeeFullName: fullName }),
        );
      } catch {
        // keep fallback initial when full name is unavailable
      }
    };

    loadName();
  }, [user]);

  const nameSource =
    employeeFullName ||
    user?.employeeFullName ||
    user?.fullName ||
    user?.email?.split("@")[0] ||
    "E";
  const profileInitial = nameSource.charAt(0).toUpperCase();

  const handleLogout = async () => {
    setErrorMessage("");
    setIsLogOut(true);

    try {
      await logoutUser();
      localStorage.removeItem("staffsphereUser");
      navigate("/", { replace: true });
    } catch (error) {
      setErrorMessage(error.message || "Logout failed");
    } finally {
      setIsLogOut(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 rounded-lg">
        <span className="h-10 w-10 rounded-full border-2 border-blue-500 bg-blue-50 text-blue-700 font-bold text-xl flex items-center justify-center shrink-0">
          {profileInitial}
        </span>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLogOut}
          className="w-52 flex justify-center items-center rounded-lg border border-red-200 text-red-600 bg-red-100 px-4 py-2.5 text-sm font-semibold transition-colors gap-2 hover:border-red-400 disabled:opacity-70"
        >
          <span>{isLogOut ? "Logging out..." : "Log Out"}</span>
          <LogOut className="h-4 w-4" />
        </button>
      </div>

      {errorMessage && (
        <p className="text-xs text-red-600 mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default ProfileCard;
