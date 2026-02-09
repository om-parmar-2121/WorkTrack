import SignInForm from "../components/auth/SignInForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4 py-8">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md p-6 sm:p-8 md:p-10 bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-gray-200">
        
        <div>
            {/* Logo */}
            <div className="mb-4 sm:mb-5 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">Worktrack</h2>
            </div>
        
            {/* Heading */}
            <h1 className="text-lg sm:text-xl md:text-2xl font-medium text-black mb-6 sm:mb-8 text-center">
                Login to your Account
            </h1>
        </div>

        {/* Form */}
        <SignInForm />

        <h2 className="mt-4 sm:mt-5 text-sm sm:text-base text-center">
          New Employee? <Link to='/signup' className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Sign Up</Link>
        </h2>
      </div>
    </div>
  );
};

export default Login;