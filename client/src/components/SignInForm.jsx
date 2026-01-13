const SignInForm = () => {
  return (
    <div>
      <form className="space-y-4">
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
            Sign in
          </button>
        </form>
    </div>
  );
};

export default SignInForm;