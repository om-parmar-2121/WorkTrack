import { useState } from "react";

const SignUpForm = () => {

  const SignUpData = {
    role: '',
    fullName: '',
    email: '',
    password: ''
  }

  const [role, setRole] = useState('')
  const [fName, setFName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitForm = (e) => {
    e.preventDefault()
    SignUpData.role = role
    SignUpData.fullName = fName
    SignUpData.email = email
    SignUpData.password = password

  }

  const fullNameSubmit = (e) => {
    setFName(e.target.value)
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
          {/* Role */}
          <div className="space-y-2 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-medium text-gray-600">Select Role</label>
            <div className="flex gap-2">
              <button
                type="button"
                className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-md transition-colors cursor-pointer ${
                  role === 'HR'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-400 bg-slate-50 text-gray-700 hover:border-blue-600 hover:text-blue-600'
                }`}
                onClick={(e) => {
                  setRole('HR')
                }}
              >
                HR
              </button>
              <button
                type="button"
                className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-md transition-colors cursor-pointer ${
                  role === 'Employee'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-400 bg-slate-50 text-gray-700 hover:border-blue-600 hover:text-blue-600'
                }`}
                onClick={(e) => {
                  setRole('Employee')
                }}
              >
                Employee
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
              value={fName}
              onChange={fullNameSubmit}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-slate-50 border border-gray-400 rounded-md placeholder-gray-800 focus:outline-none focus:border-blue-600 hover:border-blue-600"
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
            Sign Up
          </button>
        </form>
    </div>
  );
};

export default SignUpForm;