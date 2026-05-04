import { X } from "lucide-react";
import { useState } from "react";
import { submitLeaveRequest } from "../../services/leaveService";

const toDateInputValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getDateBounds = () => {
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const maxDate = new Date(minDate);
  maxDate.setDate(maxDate.getDate() + 365);

  return {
    minDate: toDateInputValue(minDate),
    maxDate: toDateInputValue(maxDate),
  };
};

const diffDaysInclusive = (startDate, endDate) => {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const days = Math.floor((end - start) / (24 * 60 * 60 * 1000)) + 1;
  return days;
};

const LeaveApplicationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { minDate, maxDate } = getDateBounds();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.startDate || !formData.endDate || !formData.reason.trim()) {
      setErrorMessage("All fields are required");
      return;
    }

    if (formData.startDate < minDate || formData.endDate < minDate) {
      setErrorMessage("Leave dates cannot be in the past");
      return;
    }

    if (formData.startDate > maxDate || formData.endDate > maxDate) {
      setErrorMessage("Leave dates must be within one year from today");
      return;
    }

    if (formData.endDate < formData.startDate) {
      setErrorMessage("End date must be after start date");
      return;
    }

    if (diffDaysInclusive(formData.startDate, formData.endDate) > 60) {
      setErrorMessage("Leave duration cannot exceed 60 days");
      return;
    }

    if (formData.reason.trim().length < 5) {
      setErrorMessage("Reason must be at least 5 characters long");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await submitLeaveRequest({
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason.trim(),
      });

      alert("Leave application submitted successfully!");
      onClose();
    } catch (error) {
      setErrorMessage(error.message || "Failed to submit leave request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(4px)',
    }}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-blue-600 text-white p-4 md:p-6 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-bold md:text-2xl">Apply for Leave</h2>
          <button
            onClick={onClose}
            className="hover:bg-blue-700 p-2 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-4 md:p-6">
          {errorMessage ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}
          
          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                min={minDate}
                max={maxDate}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                min={formData.startDate || minDate}
                max={maxDate}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Please provide a reason for your leave..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveApplicationForm;
