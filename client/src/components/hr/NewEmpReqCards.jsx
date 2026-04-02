import { LineWobble } from 'ldrs/react'
import 'ldrs/react/LineWobble.css'

const formatDate = (dateValue) => {
  if (!dateValue) return "-";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString();
};

const NewEmpReqCard = ({
  newEmployees,
  isLoading,
  errorMessage,
  processingId,
  onApprove,
  onDecline,
}) => {
  if (isLoading) {
    return <div className="flex items-center justify-center py-10">
              <LineWobble
                size="80"
                stroke="5"
                bgOpacity="0.1"
                speed="1.75"
                color="black"
              />
            </div>
  }

  if (errorMessage) {
    return <p className="text-sm text-red-600">{errorMessage}</p>;
  }

  if (newEmployees.length === 0) {
    return <p className="text-sm text-gray-500">No pending employee requests.</p>;
  }

  return (
    <div className="space-y-4">
      {newEmployees.map((employee) => (
        <div
          key={employee._id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-lg">
                {employee.fullName?.charAt(0) || "E"}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900">{employee.fullName}</p>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {employee.userId?.role || "Employee"}
                </span>
              </div>
              <p className="text-sm text-gray-500">{employee.userId?.email || "-"}</p>
              <p className="text-xs text-gray-400 mt-1">
                Joined: {formatDate(employee.dateOfJoining)}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={processingId === employee.userId?._id}
              onClick={() => onApprove(employee.userId?._id)}
              className="px-5 py-2 bg-blue-100 text-blue-900 border-2 border-blue-300 hover:bg-blue-200 text-sm font-medium rounded-lg transition-colors disabled:bg-blue-300"
            >
              {processingId === employee.userId?._id ? "Accepting..." : "Accept"}
            </button>
            <button
              type="button"
              disabled={processingId === employee._id}
              onClick={() => onDecline(employee._id)}
              className="px-5 py-2 bg-white hover:bg-gray-100 text-gray-800 text-sm font-medium rounded-lg border-2 border-gray-200 transition-colors disabled:text-gray-400"
            >
              {processingId === employee._id ? "Declining..." : "Decline"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewEmpReqCard;
