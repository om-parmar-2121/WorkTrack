import { useState } from "react";

const SignInForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (onSubmit) {
      onSubmit({ ...formData });
    }
  };

  return (
    <form className="space-y-4 sm:space-y-5" onSubmit={submitForm}>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"> Email </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="xyz@gmail.com"
          className={`w-full px-3 sm:px-4 py-3 sm:py-3.5 text-base bg-gray-50 border-2 rounded-lg placeholder-gray-500 focus:outline-none focus:bg-white transition-all ${
            errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
          }`}
          required
          autoComplete="username"
          autoCapitalize="off"
          autoCorrect="off" />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"> Password </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="••••••••"
          className={`w-full px-3 sm:px-4 py-3 sm:py-3.5 text-base bg-gray-50 border-2 rounded-lg placeholder-gray-500 focus:outline-none focus:bg-white transition-all ${
            errors.password ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
          }`}
          required
          autoComplete="current-password" />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-3.5 text-base sm:text-lg font-semibold rounded-lg transition-colors mt-2 active:bg-blue-800 touch-highlight-transparent"> Sign in </button>
    </form>
  );
};

export default SignInForm;