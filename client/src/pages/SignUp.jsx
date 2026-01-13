import SignUpForm from "../components/SignUpForm";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center from-indigo-50 to-purple-100">
        <div className="w-full max-w-md p-8 bg-slate-50 rounded-xl shadow-lg border border-gray-300">
            <div>
                {/* Logo */}
                <div className="mb-8 text-center">
                    <h2 className="text-4xl font-bold text-blue-900">Worktrack</h2>
                </div>
        
                {/* Heading */}
                <h1 className="text-xl font-medium text-black mb-8 text-center">
                    Sign Up to your Account
                </h1>
            </div>

            <SignUpForm />

            <h2 className="mt-5">Already have registered ? <Link to='/' className="text-blue-600 font-semibold">Login</Link></h2>
        </div>
    </div>
  );
};

export default SignUp;