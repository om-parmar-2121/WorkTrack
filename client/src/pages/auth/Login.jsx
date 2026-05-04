import SignInForm from "../../components/auth/SignInForm";
import { loginUser } from "../../services/authService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("staffsphereUser");

    if (!storedUser) {
      setIsCheckingSession(false);
      return;
    }

    try {
      const user = JSON.parse(storedUser);

      if (isTokenExpired(user?.token)) {
        localStorage.removeItem("staffsphereUser");
        setIsCheckingSession(false);
        return;
      }

      if (user?.role === "HR") {
        navigate("/hr/dashboard", { replace: true });
        return;
      }

      if (user?.role === "Employee") {
        navigate("/employee/dashboard", { replace: true });
        return;
      }

      localStorage.removeItem("staffsphereUser");
    } catch {
      localStorage.removeItem("staffsphereUser");
    }

    setIsCheckingSession(false);
  }, [navigate]);

  const handleLogin = async (formData) => {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await loginUser(formData);
      const role = response?.responseData?.user?.role;
      const user = response?.responseData?.user;
      const employeeFullName = response?.responseData?.employee?.fullName;
      const token = response?.responseData?.token;

      if (user) {
        const storageUser = { ...user, employeeFullName, token };

        localStorage.setItem("staffsphereUser", JSON.stringify(storageUser));
      }

      if (role === "HR") {
        navigate("/hr/dashboard");
        return;
      }

      navigate("/employee/dashboard");
    } catch (error) {
      setErrorMessage(error.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCheckingSession) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-3 py-6 sm:px-4 sm:py-8">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md p-5 sm:p-8 md:p-10 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100">
        <div>
            {/* Logo */}
            <div className="mb-4 sm:mb-5 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">StaffSphere</h2>
            </div>
        
            {/* Heading */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-6 sm:mb-8 text-center">
                Login to your Account
            </h1>
        </div>

        {/* Form */}
        <div className="mb-6 sm:mb-8">
          <SignInForm onSubmit={handleLogin} />
        </div>

        {isSubmitting && (
          <p className="text-sm text-gray-600 text-center -mt-2 mb-3">Signing in...</p>
        )}

        {errorMessage && (
          <p className="text-sm text-red-600 text-center -mt-2 mb-3">{errorMessage}</p>
        )}

        <p className="mt-5 sm:mt-6 text-sm sm:text-base text-center text-gray-700">
          New Employee? <Link to='/signup' className="text-blue-600 font-bold hover:text-blue-700 transition-colors">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;