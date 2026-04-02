import { useState } from "react";

const SignUpForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    role: '',
    fullName: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    birthdate: '',
    position: '',
    department: '',
    workplace: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRoleChange = (selectedRole) => {
    setFormData(prev => ({
      ...prev,
      role: selectedRole
    }));

    if (errors.role) {
      setErrors(prev => ({
        ...prev,
        role: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.role) newErrors.role = 'Please select a role';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.gender) newErrors.gender = 'Please select gender';
    if (!formData.birthdate) newErrors.birthdate = 'Date of birth is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.department) newErrors.department = 'Please select department';
    if (!formData.workplace.trim()) newErrors.workplace = 'Workplace/Branch is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (onSubmit) {
        await onSubmit({ ...formData });
      }
    }
  };

  return (
    <form className="space-y-4 sm:space-y-5" onSubmit={submitForm}>
      
      {/* Role Selection */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
          Select Role <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-3 sm:gap-4">
          <button
            type="button"
            className={`flex-1 px-3 sm:px-4 py-3 sm:py-3.5 text-base font-semibold border-2 rounded-lg transition-all active:scale-95 ${
              formData.role === 'HR'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-blue-400 active:bg-blue-50'
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleRoleChange('HR');
            }}> HR </button>
          <button
            type="button"
            className={`flex-1 px-3 sm:px-4 py-3 sm:py-3.5 text-base font-semibold border-2 rounded-lg transition-all active:scale-95 ${
              formData.role === 'Employee'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-blue-400 active:bg-blue-50'
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleRoleChange('Employee');
            }}> Employee </button>
        </div>
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
        </div>

      {/* Full Name */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="fullName"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={handleInputChange}
          className={`w-full px-3 sm:px-4 py-3 sm:py-3.5 text-base bg-gray-50 border-2 rounded-lg placeholder-gray-500 focus:outline-none focus:bg-white transition-all ${
            errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
          }`}
          required
        />
        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="xyz@gmail.com"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-3 sm:px-4 py-3 sm:py-3.5 text-base bg-gray-50 border-2 rounded-lg placeholder-gray-500 focus:outline-none focus:bg-white transition-all ${
            errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
          }`}
          required
          autoCapitalize="off"
          autoCorrect="off"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleInputChange}
          className={`w-full px-3 sm:px-4 py-3 sm:py-3.5 text-base bg-gray-50 border-2 rounded-lg placeholder-gray-500 focus:outline-none focus:bg-white transition-all ${
            errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
          }`}
          required
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          placeholder="9876543210"
          value={formData.phone}
          onChange={handleInputChange}
          className={`w-full px-3 sm:px-4 py-3 sm:py-3.5 text-base bg-gray-50 border-2 rounded-lg placeholder-gray-500 focus:outline-none focus:bg-white transition-all ${
            errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
          }`}
          required
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      {/* Gender & Birthdate */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className={`w-full px-3 sm:px-4 py-3 sm:py-3.5 text-base bg-gray-50 border-2 rounded-lg focus:outline-none focus:bg-white transition-all ${
              errors.gender ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
            }`}
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleInputChange}
            className={`w-full px-3 sm:px-4 py-3 sm:py-3.5 text-base bg-gray-50 border-2 rounded-lg focus:outline-none focus:bg-white transition-all ${
              errors.birthdate ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
            }`}
            required
          />
          {errors.birthdate && <p className="text-red-500 text-xs mt-1">{errors.birthdate}</p>}
        </div>
      </div>

      {/* Position & Department */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Position <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="position"
            placeholder="e.g., Senior Developer"
            value={formData.position}
            onChange={handleInputChange}
            className={`w-full px-3 sm:px-4 py-3 sm:py-3.5 text-base bg-gray-50 border-2 rounded-lg placeholder-gray-500 focus:outline-none focus:bg-white transition-all ${
              errors.position ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
            }`}
            required
          />
          {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Department <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="department"
            placeholder="e.g., Development"
            value={formData.department}
            onChange={handleInputChange}
            className={`w-full px-3 sm:px-4 py-3 sm:py-3.5 text-base bg-gray-50 border-2 rounded-lg placeholder-gray-500 focus:outline-none focus:bg-white transition-all ${
              errors.department ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
            }`}
            required
          />
          {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
        </div>
      </div>

      {/* Workplace/Branch */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
          Workplace/Branch <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="workplace"
          placeholder="e.g., Headquarter, Ahmedabad"
          value={formData.workplace}
          onChange={handleInputChange}
          className={`w-full px-3 sm:px-4 py-3 sm:py-3.5 text-base bg-gray-50 border-2 rounded-lg placeholder-gray-500 focus:outline-none focus:bg-white transition-all ${
            errors.workplace ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
          }`}
          required
        />
        {errors.workplace && <p className="text-red-500 text-xs mt-1">{errors.workplace}</p>}
      </div>

      {/* Address */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
          Address <span className="text-red-500">*</span>
        </label>
        <textarea
          name="address"
          placeholder="Street address, city, state, zip code"
          value={formData.address}
          onChange={handleInputChange}
          rows="3"
          className={`w-full px-3 sm:px-4 py-3 sm:py-3.5 text-base bg-gray-50 border-2 rounded-lg placeholder-gray-500 focus:outline-none focus:bg-white transition-all resize-none ${
            errors.address ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
          }`}
          required
        />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-3.5 text-base sm:text-lg font-semibold rounded-lg transition-colors mt-2 active:bg-blue-800"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;