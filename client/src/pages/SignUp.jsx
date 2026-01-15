import SignUpForm from "../components/SignUpForm";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4 py-8">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md p-6 sm:p-8 md:p-10 bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-gray-200">
            <div>
                {/* Logo */}
                <div className="mb-4 sm:mb-5 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">Worktrack</h2>
                </div>
        
                {/* Heading */}
                <h1 className="text-lg sm:text-xl md:text-2xl font-medium text-black mb-4 sm:mb-5 text-center">
                    Sign Up to your Account
                </h1>
            </div>

            <SignUpForm />

            <h2 className="mt-4 sm:mt-5 text-sm sm:text-base text-center">
              Already have registered? <Link to='/' className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Login</Link>
            </h2>
        </div>
    </div>
  );
};

export default SignUp;