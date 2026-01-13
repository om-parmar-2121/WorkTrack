const SignUpForm = () => {
  return (
    <div>
        <form className="space-y-3">
          {/* Role */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-600">Select Role</label>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex-1 px-4 py-3 border rounded-md border-gray-400 bg-slate-50 text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Employee
              </button>
              <button
                type="button"
                className="flex-1 px-4 py-3 border rounded-md border-gray-400 bg-slate-50 text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                HR
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-slate-50 border border-gray-400 rounded-md placeholder-gray-800 focus:outline-none focus:border-blue-600 hover:border-blue-600"
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
              className="w-full px-4 py-3 bg-slate-50 border border-gray-400 rounded-md placeholder-gray-800 focus:outline-none focus:border-blue-600 transition-colors hover:border-blue-600"
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
              className="w-full px-4 py-3 bg-slate-50 border border-gray-400 rounded-md placeholder-gray-800 focus:outline-none focus:border-blue-600 transition-colors hover:border-blue-600"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-md font-medium hover:bg-blue-800 transition-colors mt-6"
          >
            Sign Up
          </button>
        </form>
    </div>
  );
};

export default SignUpForm;