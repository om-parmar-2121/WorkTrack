import SignUpForm from "../../components/auth/SignUpForm";
import { registerUser } from "../../services/authService";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async (formData) => {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await registerUser(formData);

      if (formData.role === "Employee") {
        navigate("/register-pending");
        return;
      }

      navigate("/");
    } catch (error) {
      setErrorMessage(error.message || "Sign up failed");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                Create your Account
            </h1>
        </div>

        {/* Form */}
        <div className="mb-6 sm:mb-8">
          <SignUpForm onSubmit={handleSignUp} />
        </div>

        {isSubmitting && (
          <p className="text-sm text-gray-600 text-center -mt-2 mb-3">Creating account...</p>
        )}

        {errorMessage && (
          <p className="text-sm text-red-600 text-center -mt-2 mb-3">{errorMessage}</p>
        )}

        <p className="mt-5 sm:mt-6 text-sm sm:text-base text-center text-gray-700">
          Already have account? <Link to='/' className="text-blue-600 font-bold hover:text-blue-700 transition-colors">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;