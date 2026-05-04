import { useEffect, useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { deleteEmployee, updateEmployee } from "../../services/employeeService";

const EmployeeEditModal = ({ employee, onClose, onSaved, onDeleted }) => {
  const [formData, setFormData] = useState({
    position: "",
    department: "",
    workplace: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!employee) return;

    setFormData({
      position: employee.position || "",
      department: employee.department || "",
      workplace: employee.workplace || "",
    });
  }, [employee]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!employee?._id) {
      setErrorMessage("Invalid employee selected");
      return;
    }

    if (!formData.position.trim() || !formData.department.trim() || !formData.workplace.trim()) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const response = await updateEmployee(employee._id, {
        position: formData.position.trim(),
        department: formData.department.trim(),
        workplace: formData.workplace.trim(),
      });

      onSaved(response?.employee || null);
      onClose();
    } catch (error) {
      setErrorMessage(error.message || "Failed to update employee details");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = () => {
    setErrorMessage("");
    setShowDeleteConfirm(true);
  };

  const handleCancelDelete = () => {
    if (isDeleting) return;
    setShowDeleteConfirm(false);
  };

  const handleConfirmDelete = async () => {
    if (!employee?._id) {
      setErrorMessage("Invalid employee selected");
      return;
    }

    try {
      setIsDeleting(true);
      setErrorMessage("");

      const response = await deleteEmployee(employee._id);
      onDeleted?.(response?.employee || employee);
      onClose();
    } catch (error) {
      setErrorMessage(error.message || "Failed to delete employee");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (!employee) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15, 23, 42, 0.35)" }}
    >
      <div className="w-full max-w-xl rounded-xl bg-white shadow-2xl border border-blue-100 overflow-hidden">
        <div className="flex items-center justify-between bg-blue-500 px-4 py-4 text-white md:px-6">
          <div>
            <h2 className="text-lg font-semibold">Employee Details</h2>
            <p className="text-xs text-blue-100 mt-1">{employee.fullName || "Employee"} ({employee.employeeId || "-"})</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 hover:bg-blue-600 transition-colors"
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-4 md:p-6">
          {errorMessage ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}

          {showDeleteConfirm ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-red-100 p-2 text-red-600">
                  <AlertTriangle size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-800">
                    Delete employee account?
                  </p>
                  <p className="mt-1 text-sm text-red-700">
                    This will permanently remove <span className="font-semibold">{employee.fullName || "this employee"}</span> and the linked user account.
                  </p>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={handleCancelDelete}
                      disabled={isDeleting}
                      className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-70"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmDelete}
                      disabled={isDeleting}
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-70"
                    >
                      <Trash2 size={16} />
                      {isDeleting ? "Deleting..." : "Confirm Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Workplace</label>
            <input
              type="text"
              name="workplace"
              value={formData.workplace}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="pt-2 flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-70"
            >
              Cancel
            </button>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleDeleteClick}
                disabled={isSubmitting || isDeleting}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-70"
              >
                <Trash2 size={16} />
                Delete Employee
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isDeleting}
                className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 disabled:opacity-70"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeEditModal;
