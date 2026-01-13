const SignUpForm = () => {
  return (
    <div>
        <form className="space-y-3">
          {/* Role */}
          <div>
            
          </div>

          {/* Full Name */}
          <div>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-slate-50 border border-gray-400 rounded-md placeholder-gray-800 focus:outline-none focus:border-blue-600"
              required
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-slate-50 border border-gray-400 rounded-md placeholder-gray-800 focus:outline-none focus:border-blue-600 transition-colors"
              required
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-slate-50 border border-gray-400 rounded-md placeholder-gray-800 focus:outline-none focus:border-blue-600 transition-colors"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 bg-slate-50 border border-gray-400 rounded-md placeholder-gray-800 focus:outline-none focus:border-blue-600 transition-colors"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-md font-medium hover:bg-blue-800 transition-colors"
          >
            Sign Up
          </button>
        </form>
    </div>
  );
};

export default SignUpForm;