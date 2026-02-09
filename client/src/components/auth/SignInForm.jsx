import { useState } from "react";

const SignInForm = () => {

  const SignInData = {
    email: "",
    password: ""
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitForm = (e) => {
    e.preventDefault()
    SignInData.email = email
    SignInData.password = password
  }

  const emailSubmit = (e) => {
    setEmail(e.target.value)
  }

  const passwordSubmit = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div>
      <form
        className="space-y-3 sm:space-y-4"
        onSubmit={submitForm}
      >
        {/* Email */}
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={emailSubmit}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-slate-50 border border-gray-400 rounded-md placeholder-gray-800 focus:outline-none focus:border-blue-600 transition-colors hover:border-blue-600"
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
            value={password}
            onChange={passwordSubmit}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-slate-50 border border-gray-400 rounded-md placeholder-gray-800 focus:outline-none focus:border-blue-600 transition-colors hover:border-blue-600"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 sm:py-3 text-sm sm:text-base rounded-md font-medium hover:bg-blue-800 transition-colors mt-4 sm:mt-6"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default SignInForm;